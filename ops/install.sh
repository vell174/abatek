#!/usr/bin/env bash
# Полная установка проекта на чистый сервер Ubuntu 22.04/24.04.
#
# Запуск после git clone:
#   cd /opt/abatek
#   sudo bash ops/install.sh
#
# Без вопросов (для повторного запуска / автоматизации):
#   sudo SITE_DOMAIN=abatek74.ru ACME_EMAIL=admin@abatek74.ru bash ops/install.sh
#
# Скрипт идемпотентен: повторный запуск ничего не ломает, уже сделанные шаги пропускаются.
set -euo pipefail

cd "$(dirname "$0")/.."
PROJECT_DIR="$(pwd)"

if [ "$(id -u)" -ne 0 ]; then
  echo ">>> Нужны права root, перезапускаю через sudo..."
  exec sudo -E bash "$0" "$@"
fi

step() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }
info() { printf '    %s\n' "$1"; }
warn() { printf '\033[1;33m    ВНИМАНИЕ: %s\033[0m\n' "$1"; }
fail() { printf '\033[1;31m!!! %s\033[0m\n' "$1" >&2; exit 1; }

# ---------------------------------------------------------------- 0. параметры
if [ -z "${SITE_DOMAIN:-}" ] && [ -f .env ]; then
  SITE_DOMAIN="$(grep -E '^SITE_DOMAIN=' .env | cut -d= -f2- || true)"
fi

if [ -z "${SITE_DOMAIN:-}" ]; then
  if [ -t 0 ]; then
    read -rp "Домен сайта (без https:// и www), например abatek74.ru: " SITE_DOMAIN
  else
    fail "Не задан SITE_DOMAIN. Запустите: sudo SITE_DOMAIN=abatek74.ru bash ops/install.sh"
  fi
fi

SITE_DOMAIN="$(echo "$SITE_DOMAIN" | tr -d '[:space:]' | sed -e 's#^https\?://##' -e 's#/.*$##' -e 's/^www\.//')"
[ -n "$SITE_DOMAIN" ] || fail "Пустой домен."

ACME_EMAIL="${ACME_EMAIL:-admin@${SITE_DOMAIN}}"
MAIL_FROM="${MAIL_FROM:-site@${SITE_DOMAIN}}"
MAIL_TO="${MAIL_TO:-zakaz@${SITE_DOMAIN}}"
MAIL_ADMIN="${MAIL_ADMIN:-admin@${SITE_DOMAIN}}"
FQDN="mail.${SITE_DOMAIN}"
SHORT_NAME="mail"

step "Параметры установки"
info "Каталог проекта : ${PROJECT_DIR}"
info "Домен           : ${SITE_DOMAIN}"
info "Hostname сервера: ${FQDN}"
info "Let's Encrypt   : ${ACME_EMAIL}"
info "Почта           : ${MAIL_FROM} (отправитель), ${MAIL_TO} (заявки), ${MAIL_ADMIN} (системная)"

# ------------------------------------------------------------------ 1. DNS-резолвер
step "1/8 Проверка DNS-резолвера сервера"
fix_resolv() {
  cp /etc/resolv.conf "/etc/resolv.conf.bak.$(date +%Y%m%d%H%M%S)" 2>/dev/null || true
  printf 'nameserver 8.8.8.8\nnameserver 1.1.1.1\nnameserver 77.88.8.8\n' > /etc/resolv.conf
  info "Файл /etc/resolv.conf перезаписан рабочими DNS-серверами."
}

# на некоторых VPS (SolusVM) resolv.conf приходит битым: строки склеены без перевода строки
if [ ! -s /etc/resolv.conf ]; then
  warn "/etc/resolv.conf пуст или отсутствует."
  fix_resolv
elif grep -qE '[0-9]nameserver|^[^#[:space:]].*nameserver' /etc/resolv.conf; then
  warn "В /etc/resolv.conf склеенные строки — DNS не работает."
  fix_resolv
elif ! getent hosts deb.debian.org >/dev/null 2>&1 && ! getent hosts github.com >/dev/null 2>&1; then
  warn "Резолвер не отвечает."
  fix_resolv
else
  info "Резолвер работает."
fi

if ! getent hosts github.com >/dev/null 2>&1; then
  fail "DNS по-прежнему не работает. Проверьте /etc/resolv.conf и сетевые настройки VPS."
fi

# ------------------------------------------------------- 2. пакеты и hostname
step "2/8 Обновление системы и базовые пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git openssl ufw gnupg dnsutils whois

step "3/8 Hostname и /etc/hosts"
hostnamectl set-hostname "$FQDN"

cp /etc/hosts "/etc/hosts.bak.$(date +%Y%m%d%H%M%S)"
ESC_FQDN="$(printf '%s' "$FQDN" | sed 's/\./\\./g')"
# убрать прежнюю запись 127.0.1.1 (в том числе приклеенную к чужой строке без переноса)
sed -i "s/127\.0\.1\.1[[:space:]]\+${ESC_FQDN}\([[:space:]]\+${SHORT_NAME}\)\?[[:space:]]*$//" /etc/hosts
sed -i 's/[[:space:]]\+$//' /etc/hosts
sed -i '/^[[:space:]]*$/d' /etc/hosts
# гарантировать перевод строки в конце файла, иначе новая запись приклеится
if [ -s /etc/hosts ] && [ -n "$(tail -c1 /etc/hosts)" ]; then printf '\n' >> /etc/hosts; fi
printf '127.0.1.1 %s %s\n' "$FQDN" "$SHORT_NAME" >> /etc/hosts

info "hostname -f: $(hostname -f 2>/dev/null || echo '—')"

# ------------------------------------------------------------------- 3. swap
step "4/8 Swap"
MEM_MB="$(awk '/MemTotal/ {printf "%d", $2/1024}' /proc/meminfo)"
if [ "$(swapon --show --noheadings | wc -l)" -gt 0 ]; then
  info "Swap уже включён, пропускаю."
elif [ "$MEM_MB" -ge 4000 ]; then
  info "RAM ${MEM_MB} МБ — swap не требуется."
else
  if [ ! -f /swapfile ]; then
    fallocate -l 4G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=4096
    chmod 600 /swapfile
    mkswap /swapfile
  fi
  swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  info "Создан swap 4 ГБ."
fi

# ----------------------------------------------------------------- 4. docker
step "5/8 Docker и Docker Compose"
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  info "Docker уже установлен: $(docker --version)"
else
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
systemctl enable --now docker
info "$(docker --version) / $(docker compose version)"

# ------------------------------------------------------------------ 5. файрвол
step "6/8 Файрвол (ufw)"
SSH_PORT="$(awk '/^[[:space:]]*Port[[:space:]]+[0-9]+/ {print $2; exit}' /etc/ssh/sshd_config 2>/dev/null || true)"
ufw allow OpenSSH >/dev/null 2>&1 || true
if [ -n "${SSH_PORT:-}" ] && [ "$SSH_PORT" != "22" ]; then
  ufw allow "${SSH_PORT}/tcp" >/dev/null
  info "Открыт нестандартный SSH-порт ${SSH_PORT}."
fi
for p in 80 443 25 465 587 993; do ufw allow "${p}/tcp" >/dev/null; done
ufw --force enable >/dev/null
info "Открыты порты: SSH, 80, 443, 25, 465, 587, 993."

# --------------------------------------------------------------------- 6. .env
step "7/8 Конфигурация .env"
if [ -f .env ]; then
  info ".env уже существует — оставляю без изменений."
else
  umask 077
  cat > .env <<EOF
SITE_DOMAIN=${SITE_DOMAIN}
ACME_EMAIL=${ACME_EMAIL}
POSTGRES_DB=abatek
POSTGRES_USER=abatek
POSTGRES_PASSWORD=$(openssl rand -hex 24)
BASIC_AUTH_USER=abatek
BASIC_AUTH_PASSWORD=$(openssl rand -hex 16)
BASIC_AUTH_HASH=
MAIL_FROM=${MAIL_FROM}
MAIL_TO=${MAIL_TO}
MAIL_ADMIN=${MAIL_ADMIN}
MAIL_SSL_TYPE=
EOF
  chmod 600 .env
  info "Создан .env (пароль БД сгенерирован случайно)."
fi

if ! grep -q '^BASIC_AUTH_USER=' .env; then
  BASIC_AUTH_PASSWORD="$(openssl rand -hex 16)"
  BASIC_AUTH_HASH="$(openssl passwd -apr1 "$BASIC_AUTH_PASSWORD")"
  BASIC_AUTH_HASH="${BASIC_AUTH_HASH//$/\$\$}"
  printf '\nBASIC_AUTH_USER=abatek\nBASIC_AUTH_PASSWORD=%s\nBASIC_AUTH_HASH=%s\n' \
    "$BASIC_AUTH_PASSWORD" "$BASIC_AUTH_HASH" >> .env
  chmod 600 .env
  info "Добавлены настройки Basic Auth."
fi

if ! grep -q '^BASIC_AUTH_HASH=.' .env; then
  BASIC_AUTH_PASSWORD="$(grep '^BASIC_AUTH_PASSWORD=' .env | cut -d= -f2-)"
  BASIC_AUTH_HASH="$(openssl passwd -apr1 "$BASIC_AUTH_PASSWORD")"
  BASIC_AUTH_HASH="${BASIC_AUTH_HASH//$/\$\$}"
  sed -i "s|^BASIC_AUTH_HASH=.*|BASIC_AUTH_HASH=${BASIC_AUTH_HASH}|" .env
fi

# ------------------------------------------------------------------ 7.5 проверка DNS
step "Проверка DNS перед выпуском сертификата"
SERVER_IP="$(curl -fsS --max-time 10 https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')"
DNS_OK=1
for host in "$SITE_DOMAIN" "www.${SITE_DOMAIN}" "$FQDN"; do
  RESOLVED="$(dig +short A "$host" | tail -n1)"
  if [ "$RESOLVED" = "$SERVER_IP" ]; then
    info "OK   ${host} -> ${RESOLVED}"
  else
    warn "${host} -> '${RESOLVED:-нет записи}', ожидался ${SERVER_IP}"
    DNS_OK=0
  fi
done

if [ "$DNS_OK" -ne 1 ]; then
  # разбираемся, в чём именно причина: делегирование, зона регистратора или кэш резолверов
  step "Диагностика DNS"

  WHOIS_OUT=""
  if whois "$SITE_DOMAIN" >/dev/null 2>&1; then
    WHOIS_OUT="$(whois "$SITE_DOMAIN" 2>/dev/null)"
    echo "$WHOIS_OUT" | grep -iE '^(nserver|state|created|paid-till|registrar)' | sed 's/^/    /' || true
  fi

  # NS домена по данным авторитетных серверов
  REG_NS="$(echo "$WHOIS_OUT" | awk '/^nserver:/ {print $2; exit}' | sed 's/\.$//')"
  DELEGATED=0
  if dig +trace "$SITE_DOMAIN" 2>/dev/null | grep -qE "^${SITE_DOMAIN}\.[[:space:]]+[0-9]+[[:space:]]+IN[[:space:]]+NS"; then
    DELEGATED=1
  fi

  ZONE_IP=""
  if [ -n "$REG_NS" ]; then
    ZONE_IP="$(dig +short A "$SITE_DOMAIN" "@${REG_NS}" 2>/dev/null | tail -n1)"
  fi

  if [ "$DELEGATED" -eq 0 ] && [ "$ZONE_IP" = "$SERVER_IP" ]; then
    warn "Записи в зоне регистратора верные (${REG_NS} -> ${ZONE_IP}),"
    warn "но домен ещё не появился в зоне верхнего уровня — делегирование не опубликовано."
    warn "Это нормально для только что зарегистрированного домена: обычно 1-4 часа."
    warn "Настраивать ничего не нужно, просто подождите."
  elif [ "$DELEGATED" -eq 0 ]; then
    warn "Домен не делегирован: в панели регистратора укажите DNS-серверы (например ns1.reg.ru, ns2.reg.ru)."
  elif [ -n "$REG_NS" ] && [ -z "$ZONE_IP" ]; then
    warn "Домен делегирован на ${REG_NS}, но A-записи в зоне нет — добавьте её в панели регистратора."
  elif [ -n "$ZONE_IP" ] && [ "$ZONE_IP" != "$SERVER_IP" ]; then
    warn "A-запись в зоне указывает на ${ZONE_IP}, а сервер имеет ${SERVER_IP} — исправьте запись."
  else
    warn "Зона отдаёт правильный адрес, публичные резолверы ещё не обновили кэш — подождите."
  fi

  info "Проверять готовность: dig +short A ${SITE_DOMAIN} @8.8.8.8"
  echo
  warn "Пока DNS не заработает, Let's Encrypt не выпустит сертификат:"
  warn "сайт поднимется, но будет открываться только по HTTP/с ошибкой сертификата."
  warn "Traefik повторяет попытку автоматически; ускорить: sudo docker compose restart traefik"
  if [ -t 0 ]; then
    read -rp "Продолжить установку? [Y/n]: " GO
    case "${GO:-Y}" in [nN]*) fail "Остановлено. Запустите скрипт снова, когда DNS заработает." ;; esac
  fi
fi

# --------------------------------------------------------------- 7. запуск стека
step "8/8 Сборка и запуск контейнеров (3–10 минут при первом запуске)"
docker compose up -d --build
docker compose ps

# ------------------------------------------------------------------- почта
step "Почтовые ящики"
printf '    Жду готовности почтового сервера (до 3 минут)'
MAIL_READY=0
for i in $(seq 1 36); do
  HS="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' abatek-mailserver 2>/dev/null || echo none)"
  if [ "$HS" = "healthy" ] && timeout 20 docker exec abatek-mailserver setup email list >/dev/null 2>&1; then
    MAIL_READY=1
    break
  fi
  printf '.'
  sleep 5
done
echo

if [ "$MAIL_READY" -ne 1 ]; then
  warn "Почтовый сервер ещё не готов (статус: ${HS:-неизвестен})."
  warn "Создайте ящики позже командой: sudo bash ops/mail-setup.sh"
  warn "Диагностика: sudo docker compose logs --tail=50 mailserver"
elif timeout 20 docker exec abatek-mailserver setup email list 2>&1 | grep -qF "$MAIL_TO"; then
  info "Ящики уже созданы, пропускаю."
  info "Показать DKIM или добавить ящики: sudo bash ops/mail-setup.sh"
elif [ -t 0 ]; then
  bash ops/mail-setup.sh
else
  info "Неинтерактивный режим. Позже выполните: sudo bash ops/mail-setup.sh"
fi

# ------------------------------------------------------------------- итог
step "Готово"
info "Сайт:        https://${SITE_DOMAIN}"
info "Проверка:    sudo bash ops/check.sh"
info "Логи:        docker compose logs -f app"
info "Обновление:  sudo bash ops/deploy.sh"
echo
info "Осталось сделать вручную (README, шаг 4):"
info "  1. Добавить DKIM-запись из вывода выше в DNS (TXT mail._domainkey)."
info "  2. Настроить PTR для ${SERVER_IP} -> ${FQDN} в панели хостера."
info "  3. Убедиться, что провайдер не блокирует порт 25."
