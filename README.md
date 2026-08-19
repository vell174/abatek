# АБАТЭК — сайт и деплой

Репозиторий: <https://github.com/vell174/abatek>

Nuxt 4 + PostgreSQL + почта + HTTPS. Разворачивается двумя командами на чистой Ubuntu 24.04.

```
Docker Compose
├── Traefik            HTTPS (Let's Encrypt, автопродление)
├── Nuxt 4             сайт + API заявок (/api/request)
├── PostgreSQL         таблица requests — все заявки
└── Docker Mailserver  site@ (отправитель), zakaz@ (заявки), admin@ (системная)
```

Заявка с формы → запись в PostgreSQL → письмо на `zakaz@`. Если письмо не ушло, заявка
всё равно в базе, а отправка повторяется автоматически каждые 5 минут.

Сервер: VPS 4 GB RAM, Ubuntu 24.04 LTS. Домены на reg.ru.
Сначала разворачиваем тест на `abatek74.ru`, потом переносим на `abatek.ru`.

---

## Шаг 1. DNS на reg.ru

Личный кабинет reg.ru → **Мои домены → abatek74.ru → Управление зоной**.
`79.133.183.189` замените на IP вашего VPS.

| Тип | Имя | Значение | Приоритет |
| --- | --- | --- | --- |
| A | `@` | `79.133.183.189` | — |
| A | `www` | `79.133.183.189` | — |
| A | `mail` | `79.133.183.189` | — |
| MX | `@` | `mail.abatek74.ru.` | `10` |
| TXT | `@` | `v=spf1 mx -all` | — |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:admin@abatek74.ru` | — |

Удалите старые MX и TXT-записи прежнего хостинга (`mx1.hosting.reg.ru` и его SPF), иначе
почта пойдёт мимо вашего сервера. Запись DKIM добавим на шаге 4.

Дальше подождите 15–60 минут, пока DNS разойдётся. Скрипт установки сам проверит записи
и предупредит, если они ещё не обновились.

---

## Шаг 2. Клонировать проект на сервер

Репозиторий проекта: **<https://github.com/vell174/abatek>**

Подключитесь по SSH и выполните:

```bash
sudo apt update && sudo apt install -y git
sudo git clone https://github.com/vell174/abatek.git /opt/abatek
```

Если репозиторий приватный, GitHub запросит доступ — создайте на сервере SSH-ключ:

```bash
ssh-keygen -t ed25519 -C abatek-vps -f ~/.ssh/id_ed25519 -N ''
cat ~/.ssh/id_ed25519.pub
```

Выведенный ключ добавьте в GitHub: <https://github.com/vell174/abatek/settings/keys> →
**Add deploy key** (галочку «Allow write access» ставить не нужно). Затем клонируйте по SSH:

```bash
sudo git clone git@github.com:vell174/abatek.git /opt/abatek
```

Проект всегда живёт в каталоге `/opt/abatek` — все команды ниже выполняются оттуда.

---

## Шаг 3. Запустить установку

Одна команда: система, Docker, файрвол, конфигурация, база, сайт, HTTPS, почта.

```bash
cd /opt/abatek && sudo bash ops/install.sh
```

Скрипт спросит:

1. **домен** — введите `abatek74.ru`;
2. **пароли для трёх почтовых ящиков** — придумайте и сохраните их.

Дальше он всё делает сам (10–15 минут при первом запуске). Скрипт можно перезапускать:
уже выполненные шаги пропускаются, `.env` не перезаписывается.

Что делает `ops/install.sh`:

- обновляет систему, ставит утилиты;
- чинит `/etc/resolv.conf`, если DNS-резолвер сервера сломан (частая беда VPS с SolusVM);
- задаёт hostname `mail.abatek74.ru` и правит `/etc/hosts`;
- ставит Docker и включает автозагрузку;
- открывает порты: SSH, 80, 443, 25, 465, 587, 993;
- создаёт `.env` со случайным паролем базы;
- проверяет, что DNS уже указывает на этот сервер;
- собирает и запускает контейнеры, Traefik выпускает сертификат Let's Encrypt;
- создаёт ящики `site@`, `zakaz@`, `admin@` и печатает DKIM-ключ.

В конце скрипт покажет статус — все четыре сервиса должны быть `running` / `healthy`:

```
abatek-traefik      running
abatek-app          running (healthy)
abatek-postgres     running (healthy)
abatek-mailserver   running (healthy)
```

Сайт уже открывается: **https://abatek74.ru**

---

## Шаг 4. Дописать DKIM в DNS

В конце вывода `ops/install.sh` будет блок вида:

```
mail._domainkey IN TXT ( "v=DKIM1; k=rsa; " "p=MIIBIjANBgkqhki..." )
```

Добавьте его в reg.ru: тип `TXT`, имя `mail._domainkey`, значение — содержимое кавычек,
склеенное в одну строку без кавычек и переносов: `v=DKIM1; k=rsa; p=MIIBIjANBgkqhki...`

Там же, в панели хостера VPS, укажите **PTR** (обратную запись) для IP сервера:
`mail.abatek74.ru`. Без DKIM и PTR письма будут попадать в спам.

Ещё раз показать ключ, если потерялся:

```bash
sudo docker exec abatek-mailserver cat /tmp/docker-mailserver/rspamd/dkim/rsa-2048-mail-abatek74.ru.public.txt
```

---

## Шаг 5. Проверить, что всё работает

```bash
cd /opt/abatek && sudo bash ops/check.sh
```

Скрипт проверит DNS, HTTPS, сертификат, отправит тестовую заявку через API, покажет её
в базе и статус отправки письма. Всё зелёное — деплой удался.

Финальная проверка вручную: откройте сайт, заполните форму и убедитесь, что письмо
пришло в ящик `zakaz@`.

### Подключить почту в почтовый клиент

| Параметр | Значение |
| --- | --- |
| Логин | `zakaz@abatek74.ru` (полностью, с доменом) |
| Пароль | заданный при установке |
| IMAP | `mail.abatek74.ru`, порт `993`, SSL/TLS |
| SMTP | `mail.abatek74.ru`, порт `465`, SSL/TLS |

Ящик `admin@` — системный: сюда идут уведомления Let's Encrypt, отчёты почтовика,
письма на `postmaster@` и `abuse@`. Его удобно переслать на личный адрес:

```bash
sudo docker exec abatek-mailserver setup alias add admin@abatek74.ru vash@example.com
```

---

## Шаг 6. Перенос на боевой abatek.ru

Когда тест признан успешным:

1. В reg.ru для `abatek.ru` создайте те же записи, что на шаге 1 (A `@`, A `www`, A `mail`,
   MX, SPF, DMARC — везде домен `abatek.ru`), удалив записи прежнего хостинга.
   Заранее выставьте TTL 300 секунд, чтобы переключение прошло быстро.
2. На сервере выполните одну команду:

   ```bash
   cd /opt/abatek && sudo bash ops/switch-domain.sh abatek.ru
   ```

   Скрипт меняет домен в `.env`, обновляет hostname, перезапускает стек (Traefik выпустит
   новый сертификат), создаёт ящики `site@abatek.ru`, `zakaz@abatek.ru`, `admin@abatek.ru`
   и печатает новый DKIM-ключ.
3. Добавьте новый DKIM в DNS `abatek.ru` (шаг 4) и смените PTR у VPS на `mail.abatek.ru`.
4. Проверьте: `sudo bash ops/check.sh`
5. Записи тестового `abatek74.ru` в reg.ru можно удалить.

---

## Обновление сайта

После пуша изменений в GitHub:

```bash
cd /opt/abatek && sudo bash ops/deploy.sh
```

Скрипт делает `git pull`, пересобирает и перезапускает сайт. База, почта и сертификаты
не затрагиваются.

---

## Повседневные команды

Все команды выполняются из `/opt/abatek`.

```bash
sudo docker compose ps              # состояние сервисов
sudo docker compose logs -f app     # логи сайта
sudo docker compose restart app     # перезапуск сайта
sudo docker compose up -d           # запустить всё
sudo docker compose stop            # остановить всё
```

**Никогда не выполняйте `docker compose down -v`** — ключ `-v` удалит базу заявок,
почту и сертификаты.

После перезагрузки сервера всё поднимается автоматически.

### Заявки

```bash
sudo bash ops/requests.sh          # последние 20 заявок
sudo bash ops/requests.sh failed   # заявки, письма по которым не ушли
sudo bash ops/requests.sh csv      # выгрузка всех заявок в zayavki.csv
```

### Почтовые ящики

```bash
sudo docker exec abatek-mailserver setup email list                      # список ящиков
sudo docker exec -it abatek-mailserver setup email add new@abatek74.ru   # добавить ящик
sudo docker exec -it abatek-mailserver setup email update zakaz@abatek74.ru  # сменить пароль
sudo docker exec -it abatek-mailserver setup email del zakaz@abatek74.ru     # удалить ящик и письма
sudo docker exec abatek-mailserver setup alias list                      # список алиасов
```

Смена пароля не влияет на работу сайта: письма он отправляет внутри Docker-сети без
авторизации, пароль `site@` нужен только для входа в ящик почтовым клиентом.

Показать DKIM-запись ещё раз (существующие ящики скрипт не трогает):

```bash
cd /opt/abatek && sudo bash ops/mail-setup.sh
```

---

## Если что-то пошло не так

| Симптом | Что делать |
| --- | --- |
| Сайт не открывается или ошибка сертификата | DNS ещё не разошёлся. Проверьте: `sudo bash ops/check.sh`, затем `sudo docker compose logs traefik \| grep -i acme`. Исправив DNS, выполните `sudo docker compose restart traefik` |
| `dig: parse of /etc/resolv.conf failed` | Битый резолвер VPS. Чинится автоматически: `sudo bash ops/install.sh`. Вручную: `printf 'nameserver 8.8.8.8\nnameserver 1.1.1.1\n' \| sudo tee /etc/resolv.conf` |
| Домен не резолвится, хотя записи в reg.ru заведены | Если домен зарегистрирован только что — делегирование появляется в зоне `.ru` через 1–4 часа. Скрипты сами это диагностируют. Ждать, проверяя `dig +short A abatek74.ru @8.8.8.8` |
| `too many failed authorizations` в логах Traefik | Лимит Let's Encrypt из-за повторных попыток при неверном DNS — подождите час |
| Контейнер `app` перезапускается | `sudo docker compose logs --tail=200 app` |
| Заявка отправилась, а письма нет | `sudo bash ops/requests.sh failed` и `sudo docker compose logs --tail=100 mailserver` |
| Письма попадают в спам | Не добавлены DKIM или PTR (шаг 4). Проверка: <https://www.mail-tester.com> |
| Внешние письма на `zakaz@` не приходят | Провайдер блокирует порт 25 — напишите в поддержку хостера, чтобы открыли его на приём и отправку |
| Кончилось место на диске | `sudo docker image prune -a -f` (тома не трогать) |
| Нужно повторить установку | `cd /opt/abatek && sudo bash ops/install.sh` — скрипт безопасно перезапускается |

Полная диагностика одной командой:

```bash
cd /opt/abatek && sudo bash ops/check.sh
```

---

## Справочник

### Скрипты

Лежат в папке `ops/`, запускаются из корня проекта (`/opt/abatek`).

| Скрипт | Назначение |
| --- | --- |
| `ops/install.sh` | полная установка на чистый сервер |
| `ops/check.sh` | проверка DNS, HTTPS, сертификата, API, базы и почты |
| `ops/deploy.sh` | обновление сайта из GitHub |
| `ops/switch-domain.sh` | переключение на другой домен |
| `ops/mail-setup.sh` | создание почтовых ящиков и DKIM (вызывается из `ops/install.sh`) |
| `ops/requests.sh` | просмотр и выгрузка заявок |

### Настройки `/opt/abatek/.env`

Создаётся автоматически, менять вручную обычно не нужно.

| Переменная | Описание |
| --- | --- |
| `SITE_DOMAIN` | домен сайта |
| `ACME_EMAIL` | адрес для уведомлений Let's Encrypt |
| `POSTGRES_PASSWORD` | пароль базы (генерируется случайно) |
| `MAIL_FROM` | отправитель писем, `site@<домен>` |
| `MAIL_TO` | получатель заявок, `zakaz@<домен>` |
| `MAIL_ADMIN` | системный ящик, `admin@<домен>` |

Файл содержит пароль базы — не добавляйте его в Git.

### Порты

| Порт | Для чего |
| --- | --- |
| 80, 443 | сайт и выпуск сертификата |
| 25 | приём почты |
| 465, 587 | отправка из почтового клиента |
| 993 | чтение ящиков (IMAP) |

Порты сайта (3000) и базы (5432) наружу не открыты — только внутри Docker.

---

## Локальная разработка

Нужен Node.js 24.x.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint     # проверка кода, должно быть 0 ошибок
npm run build    # прод-сборка
```

Правила работы с кодом — в `AGENTS.md`.
