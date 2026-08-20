#!/usr/bin/env bash
# Переключение проекта на другой домен (например с abatek74.ru на abatek.ru).
#   sudo bash ops/switch-domain.sh abatek.ru
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "$(id -u)" -ne 0 ]; then exec sudo -E bash "$0" "$@"; fi

step() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }
info() { printf '    %s\n' "$1"; }
warn() { printf '\033[1;33m    ВНИМАНИЕ: %s\033[0m\n' "$1"; }
fail() { printf '\033[1;31m!!! %s\033[0m\n' "$1" >&2; exit 1; }

NEW_DOMAIN="${1:-}"
[ -n "$NEW_DOMAIN" ] || fail "Использование: sudo bash ops/switch-domain.sh abatek.ru"
NEW_DOMAIN="$(echo "$NEW_DOMAIN" | tr -d '[:space:]' | sed -e 's#^https\?://##' -e 's#/.*$##' -e 's/^www\.//')"

[ -f .env ] || fail "Нет файла .env — сначала выполните: sudo bash ops/install.sh"
set -a; . ./.env; set +a
OLD_DOMAIN="$SITE_DOMAIN"
[ "$OLD_DOMAIN" != "$NEW_DOMAIN" ] || fail "Домен уже ${NEW_DOMAIN}."

step "Переключение ${OLD_DOMAIN} -> ${NEW_DOMAIN}"

command -v dig >/dev/null 2>&1 || apt-get install -y dnsutils >/dev/null 2>&1 || true
SERVER_IP="$(curl -fsS --max-time 10 https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')"
DNS_OK=1
for host in "$NEW_DOMAIN" "www.${NEW_DOMAIN}" "mail.${NEW_DOMAIN}" "autoconfig.${NEW_DOMAIN}"; do
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
sed -i "s/${OLD_DOMAIN//./\\.}/${NEW_DOMAIN}/g" .env
grep -E '^(SITE_DOMAIN|ACME_EMAIL|MAIL_FROM|MAIL_TO|MAIL_ADMIN)=' .env

step "Hostname"
hostnamectl set-hostname "mail.${NEW_DOMAIN}"
cp /etc/hosts "/etc/hosts.bak.$(date +%Y%m%d%H%M%S)"
sed -i "/127\.0\.1\.1[[:space:]]/d" /etc/hosts
sed -i 's/[[:space:]]\+$//' /etc/hosts
if [ -s /etc/hosts ] && [ -n "$(tail -c1 /etc/hosts)" ]; then printf '\n' >> /etc/hosts; fi
printf '127.0.1.1 mail.%s mail\n' "$NEW_DOMAIN" >> /etc/hosts
info "hostname -f: $(hostname -f 2>/dev/null || echo '—')"

step "Перезапуск стека (Traefik выпустит новый сертификат)"
docker compose up -d --build
docker compose ps

step "Почтовые ящики нового домена"
bash ops/mail-setup.sh

step "Готово"
info "Сайт: https://${NEW_DOMAIN}"
info "Осталось: добавить DKIM в DNS ${NEW_DOMAIN} и сменить PTR на mail.${NEW_DOMAIN}."
info "Проверка: sudo bash ops/check.sh"
