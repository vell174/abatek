# АБАТЭК — сайт и деплой

Сайт на Nuxt 4 (SSR) + API приёма заявок. Вся прод-инфраструктура поднимается одной командой
`docker compose up -d --build` на чистом сервере Ubuntu.

```
Docker Compose
│
├── Traefik            — 80/443, HTTPS-сертификаты Let's Encrypt (автопродление)
│   └── маршрутизация на контейнер сайта
│
├── Nuxt 4 (app)       — сам сайт + POST /api/request (приём заявок)
│
├── PostgreSQL         — таблица requests (все заявки + статус отправки письма)
│
└── Docker Mailserver  — site@<домен> (отправитель), zakaz@<домен> (заявки),
                        admin@<домен> (системная почта)
```

Как работает заявка: форма → `POST /api/request` → запись в PostgreSQL → письмо через внутренний
SMTP на `zakaz@<домен>`. Если письмо не ушло, заявка остаётся в БД со статусом `failed`,
фоновый повтор пробует отправить её каждые 5 минут (`server/plugins/mail-retry.ts`).
Заявка не теряется, даже если почта временно не работает.

Содержание:

1. [Требования к серверу](#1-требования-к-серверу)
2. [DNS на reg.ru](#2-dns-на-regru)
3. [Установка на чистую Ubuntu](#3-установка-на-чистую-ubuntu)
4. [Настройка почты](#4-настройка-почты)
5. [Проверка что всё работает](#5-проверка-что-всё-работает)
6. [Обновление сайта](#6-обновление-сайта)
7. [Ежедневное управление](#7-ежедневное-управление)
8. [Заявки: где смотреть и как выгрузить](#8-заявки-где-смотреть-и-как-выгрузить)
9. [Переезд с abatek74.ru на abatek.ru](#9-переезд-с-abatek74ru-на-abatekru)
10. [Диагностика проблем](#10-диагностика-проблем)
11. [Справочник: переменные, порты, файлы](#11-справочник-переменные-порты-файлы)
12. [Локальная разработка](#12-локальная-разработка)

---

## 1. Требования к серверу

| Параметр | Значение |
| --- | --- |
| ОС | Ubuntu 22.04 или 24.04, чистая установка |
| CPU / RAM | минимум 2 vCPU / 2 GB (сборка Nuxt требует памяти; при 2 GB обязательно включить swap — шаг 3.2) |
| Диск | от 20 GB |
| Доступ | root или пользователь с `sudo`, вход по SSH |
| IP | публичный статический IPv4 |
| Порт 25 | должен быть открыт провайдером **на вход и на выход** (у многих хостеров закрыт по умолчанию — открывается заявкой в поддержку) |
| PTR-запись | обратная запись IP → `mail.<домен>` настраивается в панели хостера VPS |

Всё ставится в каталог `/opt/abatek`. Домен ниже — `abatek74.ru` (тестовый);
для боевого просто подставьте `abatek.ru`.

---

## 2. DNS на reg.ru

Домен делегирован на reg.ru, сервер — другой (VPS). Записи правятся в личном кабинете reg.ru:
**Мои домены → abatek74.ru → Управление зоной (DNS-серверы и управление зоной)**.

Нужны записи (`203.0.113.10` замените на IP вашего VPS):

| Тип | Имя (subdomain) | Значение | Приоритет | Зачем |
| --- | --- | --- | --- | --- |
| A | `@` | `203.0.113.10` | — | сайт на голом домене |
| A | `www` | `203.0.113.10` | — | сайт на www |
| A | `mail` | `203.0.113.10` | — | почтовый сервер |
| MX | `@` | `mail.abatek74.ru.` | `10` | входящая почта на ваш сервер |
| TXT | `@` | `v=spf1 mx -all` | — | SPF: письма шлёт только ваш сервер |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:admin@abatek74.ru` | — | DMARC-отчёты на системный ящик |
| TXT | `mail._domainkey` | значение DKIM | — | добавляется **позже**, в шаге 4 |

Важно:

- Если у домена уже была почта на reg.ru (mail.hosting.reg.ru) — старые MX и SPF-записи
  нужно **удалить**, иначе почта пойдёт мимо вашего сервера.
- В reg.ru значение MX указывается с точкой на конце: `mail.abatek74.ru.`
- Обновление DNS занимает от 15 минут до нескольких часов. Не запускайте выпуск сертификата
  (шаг 3.7), пока A-записи не разошлись.

Проверка с любого компьютера:

```bash
dig +short A abatek74.ru
dig +short A mail.abatek74.ru
dig +short MX abatek74.ru
dig +short TXT abatek74.ru
```

Все A-записи должны вернуть IP вашего VPS.

---

## 3. Установка на чистую Ubuntu

Все команды выполняются на сервере по SSH.

### 3.1. Обновить систему и задать hostname

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl git openssl ufw

sudo hostnamectl set-hostname mail.abatek74.ru
```

### 3.2. Включить swap (если RAM меньше 4 GB)

Без swap сборка Nuxt может упасть с `JavaScript heap out of memory`.

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

### 3.3. Установить Docker

```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker

docker --version && docker compose version
```

`systemctl enable` включает Docker в автозагрузку — после перезагрузки сервера сайт
поднимется сам (у всех контейнеров `restart: unless-stopped`).

### 3.4. Открыть порты в файрволе

Не закрывайте текущую SSH-сессию, пока не убедитесь, что подключение по 22 работает.

```bash
sudo ufw allow OpenSSH      # 22  SSH
sudo ufw allow 80/tcp       # HTTP + проверка Let's Encrypt
sudo ufw allow 443/tcp      # HTTPS
sudo ufw allow 25/tcp       # SMTP, приём почты
sudo ufw allow 465/tcp      # SMTPS
sudo ufw allow 587/tcp      # Submission
sudo ufw allow 993/tcp      # IMAPS, чтение ящика zakaz@
sudo ufw --force enable
sudo ufw status numbered
```

Дополнительно откройте те же порты в панели VPS, если у хостера есть внешний файрвол.

### 3.5. Склонировать проект

```bash
sudo mkdir -p /opt/abatek
sudo chown "$USER":"$USER" /opt/abatek

git clone https://github.com/OWNER/REPOSITORY.git /opt/abatek
cd /opt/abatek
```

Если репозиторий приватный — создайте на сервере SSH-ключ и добавьте его в GitHub
(Settings → SSH and GPG keys, либо Deploy keys репозитория):

```bash
ssh-keygen -t ed25519 -C "abatek-vps" -f ~/.ssh/id_ed25519 -N ''
cat ~/.ssh/id_ed25519.pub          # добавить этот ключ в GitHub
ssh -T git@github.com              # проверка доступа
git clone git@github.com:OWNER/REPOSITORY.git /opt/abatek
```

### 3.6. Создать файл `.env`

`.env` в Git не хранится — его создают на сервере. Пароль БД генерируется случайно;
в нём только буквы и цифры, потому что символы `@ : / #` ломают строку подключения PostgreSQL.

```bash
cd /opt/abatek
umask 077

SITE_DOMAIN='abatek74.ru'
ACME_EMAIL='admin@abatek74.ru'   # системный ящик admin@, см. шаг 4

cat > .env <<EOF
SITE_DOMAIN=${SITE_DOMAIN}
ACME_EMAIL=${ACME_EMAIL}
POSTGRES_DB=abatek
POSTGRES_USER=abatek
POSTGRES_PASSWORD=$(openssl rand -hex 24)
MAIL_FROM=site@${SITE_DOMAIN}
MAIL_TO=zakaz@${SITE_DOMAIN}
MAIL_ADMIN=admin@${SITE_DOMAIN}
MAIL_SSL_TYPE=
EOF

cat .env
```

Образец со всеми полями и комментариями — в `.env.example`.

### 3.7. Запустить всё

Запускайте только после того, как DNS уже указывает на сервер (шаг 2): Traefik сразу
пойдёт выпускать сертификат Let's Encrypt через проверку по порту 80.

```bash
cd /opt/abatek
sudo docker compose up -d --build
sudo docker compose ps
```

Первая сборка занимает 3–10 минут (ставятся зависимости и собирается Nuxt).
Все четыре сервиса должны быть в состоянии `running` / `healthy`:

```
abatek-traefik      running
abatek-app          running (healthy)
abatek-postgres     running (healthy)
abatek-mailserver   running (healthy)
```

После этого сайт открывается по `https://abatek74.ru`.

---

## 4. Настройка почты

Выполняется **один раз** после первого успешного запуска.

```bash
cd /opt/abatek
chmod +x mail-setup.sh
sudo ./mail-setup.sh
```

Скрипт спросит пароли для трёх ящиков, создаст их и сгенерирует DKIM-ключ:

| Ящик | Роль |
| --- | --- |
| `site@abatek74.ru` | технический отправитель: от его имени сайт шлёт письма с заявками |
| `zakaz@abatek74.ru` | рабочий ящик: сюда падают заявки, его читают менеджеры |
| `admin@abatek74.ru` | **системная почта**: уведомления Let's Encrypt об истечении сертификата, отчёты и bounce-уведомления почтового сервера, письма на `postmaster@`, `abuse@`, `hostmaster@` (алиасы создаёт тот же скрипт) |

`admin@` указан в `.env` как `ACME_EMAIL` и `MAIL_ADMIN`; в контейнере почтовика он же
прописан как `POSTMASTER_ADDRESS`. Ящик нужен рабочим: на него приходят предупреждения
о проблемах с сертификатом и о недоставленных письмах, поэтому его стоит подключить
в почтовый клиент или настроить пересылку на личный адрес:

```bash
sudo docker exec abatek-mailserver setup alias add admin@abatek74.ru lichnyi@example.com
```

В конце скрипт выведет DKIM-запись вида:

```
mail._domainkey IN TXT ( "v=DKIM1; k=rsa; " "p=MIIBIjANBgkq..." )
```

Добавьте её в DNS reg.ru: тип `TXT`, имя `mail._domainkey`, значение — всё, что внутри
кавычек, склеенное в одну строку без кавычек и переносов
(`v=DKIM1; k=rsa; p=MIIBIjANBgkq...`).

Без SPF + DKIM + DMARC + PTR внешние сервисы (Яндекс, Mail.ru, Gmail) будут класть письма
в спам или отклонять их.

### Как читать ящики `zakaz@` и `admin@`

Настройки в любом почтовом клиенте (Outlook, Thunderbird, телефон):

| Параметр | Значение |
| --- | --- |
| Логин | `zakaz@abatek74.ru` или `admin@abatek74.ru` (полностью, с доменом) |
| Пароль | заданный в `mail-setup.sh` |
| IMAP-сервер | `mail.abatek74.ru`, порт `993`, SSL/TLS |
| SMTP-сервер | `mail.abatek74.ru`, порт `465`, SSL/TLS |

При `MAIL_SSL_TYPE=` (по умолчанию) почтовый сервер использует самоподписанный сертификат:
почтовый клиент один раз спросит подтверждение — согласитесь. На отправку писем самим сайтом
это не влияет: она идёт внутри Docker-сети.

Добавить ещё ящик, сменить пароль или посмотреть алиасы позже:

```bash
sudo docker exec -it abatek-mailserver setup email add new@abatek74.ru
sudo docker exec -it abatek-mailserver setup email update zakaz@abatek74.ru
sudo docker exec abatek-mailserver setup email list
sudo docker exec abatek-mailserver setup alias list
```

---

## 5. Проверка что всё работает

```bash
cd /opt/abatek
. ./.env

# 1. Сайт отдаётся по HTTPS (ожидается HTTP/2 200)
curl -I "https://${SITE_DOMAIN}"

# 2. HTTP редиректит на HTTPS (ожидается 301/308)
curl -I "http://${SITE_DOMAIN}"

# 3. Сертификат настоящий, от Let's Encrypt
echo | openssl s_client -connect "${SITE_DOMAIN}:443" -servername "${SITE_DOMAIN}" 2>/dev/null \
  | openssl x509 -noout -issuer -dates

# 4. API заявок принимает форму (ожидается {"ok":true})
curl -s -X POST "https://${SITE_DOMAIN}/api/request" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест","phone":"+70000000000","email":"test@example.com","message":"проверка","page":"/"}'

# 5. Заявка записалась в базу и письмо ушло (mail_status = sent)
sudo docker compose exec -T postgres \
  psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
  -c "SELECT id, name, phone, mail_status, created_at FROM requests ORDER BY id DESC LIMIT 5;"

# 6. Журнал почты
sudo docker compose logs --tail=50 mailserver
```

Финальная проверка вручную: откройте сайт, отправьте форму и убедитесь, что письмо
пришло в ящик `zakaz@`. Репутацию почты можно проверить, отправив письмо на
<https://www.mail-tester.com> (цель — 8/10 и выше).

---

## 6. Обновление сайта

После пуша изменений в GitHub:

```bash
cd /opt/abatek
sudo ./deploy.sh
```

`deploy.sh` делает `git pull --ff-only`, пересобирает образ, перезапускает контейнеры
и чистит старые образы. То же самое вручную:

```bash
cd /opt/abatek
git pull --ff-only
sudo docker compose up -d --build
sudo docker image prune -f
```

Обновление затрагивает только контейнер сайта: база, почта и сертификаты лежат
в Docker-томах и не пересоздаются.

---

## 7. Ежедневное управление

```bash
cd /opt/abatek

sudo docker compose ps                        # состояние всех сервисов
sudo docker compose logs -f app               # живой лог сайта
sudo docker compose logs --tail=100 traefik   # лог сертификатов и маршрутов
sudo docker compose restart app               # перезапуск сайта
sudo docker compose stop                      # остановить всё
sudo docker compose up -d                     # поднять обратно
sudo docker stats --no-stream                 # нагрузка CPU/RAM
df -h                                         # свободное место
```

**Никогда не выполняйте `docker compose down -v`** — ключ `-v` удаляет тома,
то есть базу заявок, почтовые ящики и сертификаты.

---

## 8. Заявки: где смотреть и как выгрузить

Все заявки хранятся в таблице `requests` (создаётся автоматически при первой заявке):

| Поле | Описание |
| --- | --- |
| `id` | номер заявки (он же в теме письма) |
| `name`, `phone`, `email`, `message` | данные формы |
| `page` | страница, с которой отправлена заявка |
| `mail_status` | `pending` / `sent` / `failed` |
| `mail_attempts`, `mail_error` | счётчик попыток и текст последней ошибки |
| `created_at` | дата и время |

```bash
cd /opt/abatek && . ./.env

# последние 20 заявок
sudo docker compose exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
  -c "SELECT id, created_at, name, phone, email, mail_status FROM requests ORDER BY id DESC LIMIT 20;"

# заявки, письма по которым не ушли
sudo docker compose exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
  -c "SELECT id, created_at, name, phone, mail_error FROM requests WHERE mail_status <> 'sent';"

# выгрузка всех заявок в CSV
sudo docker compose exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
  -c "\copy (SELECT * FROM requests ORDER BY id) TO STDOUT WITH CSV HEADER" > ~/zayavki.csv
```

Письма со статусом `failed` сайт автоматически пробует дослать каждые 5 минут.

---

## 9. Переезд с abatek74.ru на abatek.ru

Когда тест на `abatek74.ru` признан успешным:

1. **В коде** поменять канонический домен — `app/composables/usePageSeo.ts`, строка
   `const siteOrigin = 'https://abatek.ru';`. На тестовом домене canonical и JSON-LD
   всё равно ссылаются на `abatek.ru` — это ожидаемо и тесту не мешает.
2. **В DNS reg.ru для `abatek.ru`** прописать те же записи, что в шаге 2
   (A `@`, A `www`, A `mail`, MX, SPF, DMARC), удалив записи прежнего хостинга.
   Заранее уменьшите TTL до 300 секунд — переключение пройдёт быстрее.
3. **На сервере** обновить домен и перезапустить:

   ```bash
   cd /opt/abatek
   sed -i 's/abatek74\.ru/abatek.ru/g' .env
   git pull --ff-only
   sudo docker compose up -d --build
   ```

   Traefik сам выпустит новый сертификат для `abatek.ru` и `www.abatek.ru`.
4. **Почта нового домена** — завести ящики (`site@`, `zakaz@`, системный `admin@`)
   и новый DKIM (ключ привязан к домену):

   ```bash
   sudo ./mail-setup.sh
   ```

   Выведенную DKIM-запись добавить в DNS `abatek.ru` (`mail._domainkey`), в DMARC указать
   `rua=mailto:admin@abatek.ru`. Hostname сервера и PTR у VPS сменить на `mail.abatek.ru`.
5. Прогнать проверки из [шага 5](#5-проверка-что-всё-работает) уже для нового домена.
6. Тестовый `abatek74.ru` после переезда достаточно убрать из DNS.

---

## 10. Диагностика проблем

| Симптом | Причина и решение |
| --- | --- |
| Сайт не открывается, ошибка сертификата | DNS ещё не указывает на сервер или закрыт порт 80. Проверьте `dig +short A abatek74.ru`, `sudo ufw status`, затем `sudo docker compose logs traefik \| grep -i acme` |
| `too many failed authorizations` в логе Traefik | Сработал лимит Let's Encrypt из-за повторных попыток при неверном DNS. Исправьте DNS и подождите час |
| Контейнер `app` перезапускается | `sudo docker compose logs --tail=200 app`. Частые причины: спецсимволы в `POSTGRES_PASSWORD`, нет связи с БД |
| Сборка падает с `heap out of memory` | Мало RAM — включите swap (шаг 3.2) |
| Заявка отправляется, но письма нет | `sudo docker compose logs --tail=100 mailserver`; проверьте `mail_status` в БД (шаг 8) и что ящики созданы: `sudo docker exec abatek-mailserver setup email list` |
| Письма уходят в спам | Нет DKIM/SPF/DMARC/PTR. Проверьте записи из шагов 2 и 4, PTR — в панели VPS. Тест: <https://www.mail-tester.com> |
| Внешние письма на `zakaz@` не приходят | Провайдер блокирует порт 25 на вход или не прописан MX. Проверьте `dig +short MX abatek74.ru` и `sudo ss -lntp \| grep :25` |
| Кончилось место на диске | `docker system df`, затем `sudo docker image prune -a -f` (тома не трогать) |
| Нужно поднять всё после перезагрузки вручную | `cd /opt/abatek && sudo docker compose up -d` |

Полезное:

```bash
sudo docker compose logs --tail=200            # логи всех сервисов
sudo docker compose exec app sh                # shell внутри контейнера сайта
sudo docker compose exec mailserver bash       # shell внутри почтовика
sudo docker compose config                     # итоговый compose с подставленным .env
```

---

## 11. Справочник: переменные, порты, файлы

### Переменные `.env`

| Переменная | Обязательна | Описание |
| --- | --- | --- |
| `SITE_DOMAIN` | да | домен без `https://` и `www` — используется в правилах Traefik и hostname почтовика |
| `ACME_EMAIL` | да | e-mail для уведомлений Let's Encrypt; указывайте системный `admin@$SITE_DOMAIN` |
| `POSTGRES_PASSWORD` | да | пароль БД; только буквы и цифры (`openssl rand -hex 24`) |
| `POSTGRES_USER` | нет | по умолчанию `abatek` |
| `POSTGRES_DB` | нет | по умолчанию `abatek` |
| `MAIL_FROM` | нет | отправитель писем, по умолчанию `site@$SITE_DOMAIN` |
| `MAIL_TO` | нет | получатель заявок, по умолчанию `zakaz@$SITE_DOMAIN` |
| `MAIL_ADMIN` | нет | системный ящик (`POSTMASTER_ADDRESS` почтовика, алиасы `postmaster@`/`abuse@`), по умолчанию `admin@$SITE_DOMAIN` |
| `MAIL_SSL_TYPE` | нет | пусто = самоподписанный сертификат почтовика (рабочий вариант по умолчанию) |

Внутрь Nuxt значения приходят как `NUXT_DATABASE_URL`, `NUXT_SMTP_HOST`, `NUXT_SMTP_PORT`,
`NUXT_MAIL_FROM`, `NUXT_MAIL_TO` (см. `runtimeConfig` в `nuxt.config.ts`) — вручную их задавать
не нужно, `docker-compose.yml` собирает их из `.env`.

### Порты

| Порт | Сервис | Назначение |
| --- | --- | --- |
| 80 | Traefik | HTTP → редирект на HTTPS, проверка Let's Encrypt |
| 443 | Traefik | HTTPS сайта |
| 25 | Mailserver | приём почты от других серверов |
| 465 / 587 | Mailserver | отправка из почтовых клиентов |
| 993 | Mailserver | IMAPS, чтение ящиков |
| 3000 | Nuxt | только внутри Docker-сети, наружу не публикуется |
| 5432 | PostgreSQL | только внутри Docker-сети, наружу не публикуется |

### Файлы инфраструктуры

| Файл | Назначение |
| --- | --- |
| `docker-compose.yml` | описание всех четырёх сервисов и томов |
| `Dockerfile` | двухстадийная сборка Nuxt (node:24-alpine) |
| `.env.example` | образец конфигурации |
| `deploy.sh` | обновление: git pull + пересборка + перезапуск |
| `mail-setup.sh` | разовое создание почтовых ящиков и DKIM |
| `server/api/request.post.ts` | API приёма заявок |
| `server/utils/db.ts` | пул PostgreSQL и схема таблицы `requests` |
| `server/utils/mail.ts`, `server/utils/mail-delivery.ts` | отправка писем и учёт статусов |
| `server/plugins/mail-retry.ts` | фоновый повтор неотправленных писем |

### Docker-тома (данные, которые нельзя терять)

`pgdata` — база заявок, `dms-mail-data` — письма, `dms-config` — ящики и DKIM,
`traefik-letsencrypt` — сертификаты.

---

## 12. Локальная разработка

Требуется Node.js 24.x.

```bash
npm ci
npm run dev            # http://localhost:3000
```

```bash
npm run lint           # eslint + stylelint, должно быть 0 ошибок
npm run lint:fix
npm run format
npm run build          # прод-сборка
npm run generate       # статическая генерация
```

Без переменных `NUXT_DATABASE_URL` и `NUXT_SMTP_HOST` форма заявки локально работает
вхолостую: данные валидируются, но в базу не пишутся и письмо не отправляется.

Правила работы с кодом (структура данных страниц, БЭМ, конвенции Vue) описаны в `AGENTS.md`.
