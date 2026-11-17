#!/usr/bin/env bash
# Переключение сайта на новый основной домен с сохранением старого домена и почты.
# Старый сайт получает SSL и перенаправляет на новый с сохранением пути.
# Локальные почтовые ящики остаются на старом домене, а заявки идут на второй аргумент.
#   sudo bash ops/switch-domain.sh abatek.ru zakaz@abatek.ru
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "$(id -u)" -ne 0 ]; then exec sudo -E bash "$0" "$@"; fi

step() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }
info() { printf '    %s\n' "$1"; }
warn() { printf '\033[1;33m    ВНИМАНИЕ: %s\033[0m\n' "$1"; }
fail() { printf '\033[1;31m!!! %s\033[0m\n' "$1" >&2; exit 1; }

NEW_DOMAIN="${1:-}"
[ -n "$NEW_DOMAIN" ] || fail "Использование: sudo bash ops/switch-domain.sh abatek.ru [zakaz@abatek.ru]"
NEW_DOMAIN="$(echo "$NEW_DOMAIN" | tr -d '[:space:]' | sed -e 's#^https\?://##' -e 's#/.*$##' -e 's/^www\.//')"
NEW_MAIL_TO="${2:-zakaz@${NEW_DOMAIN}}"

[ -f .env ] || fail "Нет файла .env — сначала выполните: sudo bash ops/install.sh"
set -a; . ./.env; set +a
OLD_DOMAIN="$SITE_DOMAIN"
[ "$OLD_DOMAIN" != "$NEW_DOMAIN" ] || fail "Домен уже ${NEW_DOMAIN}."
MAIL_DOMAIN="${MAIL_DOMAIN:-${OLD_DOMAIN}}"

step "Переключение сайта ${OLD_DOMAIN} -> ${NEW_DOMAIN} с сохранением почты ${MAIL_DOMAIN}"

command -v dig >/dev/null 2>&1 || apt-get install -y dnsutils >/dev/null 2>&1 || true
SERVER_IP="$(curl -fsS --max-time 10 https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')"
DNS_OK=1
for host in "$NEW_DOMAIN" "www.${NEW_DOMAIN}"; do
  R="$(dig +short A "$host" | tail -n1)"
  if [ "$R" = "$SERVER_IP" ]; then info "OK   ${host} -> ${R}"; else warn "${host} -> ${R:-нет записи}, ожидался ${SERVER_IP}"; DNS_OK=0; fi
done
if [ "$DNS_OK" -ne 1 ]; then
  warn "DNS нового домена ещё не указывает на сервер — сертификат не выпустится."
  if [ -t 0 ]; then
    read -rp "Продолжить всё равно? [y/N]: " GO
    case "$GO" in [yY]*) ;; *) fail "Остановлено. Поправьте DNS и запустите снова." ;; esac
  fi
fi

step "Обновление .env"
cp .env ".env.bak.$(date +%Y%m%d%H%M%S)"
set_env() {
  local key="$1" value="$2"
  if grep -qE "^${key}=" .env; then
    sed -i "s|^${key}=.*$|${key}=${value}|" .env
  else
    printf '%s=%s\n' "$key" "$value" >> .env
  fi
}
set_env SITE_DOMAIN "$NEW_DOMAIN"
set_env LEGACY_SITE_DOMAIN "$OLD_DOMAIN"
set_env MAIL_DOMAIN "$MAIL_DOMAIN"
set_env MAIL_TO "$NEW_MAIL_TO"
grep -E '^(SITE_DOMAIN|LEGACY_SITE_DOMAIN|MAIL_DOMAIN|ACME_EMAIL|MAIL_FROM|MAIL_TO|MAIL_ADMIN)=' .env

step "Перезапуск сайта (Traefik выпустит сертификаты для обоих доменов)"
docker compose up -d --build --force-recreate app
docker compose ps

step "Готово"
info "Основной сайт  : https://${NEW_DOMAIN}"
info "Старый сайт    : https://${OLD_DOMAIN} -> 301 на основной"
info "Локальная почта: ${MAIL_DOMAIN} (без миграции)"
info "Заявки         : ${NEW_MAIL_TO}"
info "Проверка: sudo bash ops/check.sh"
