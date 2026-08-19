#!/usr/bin/env bash
# Первичная настройка почтовых ящиков (запустить один раз после первого docker compose up).
set -euo pipefail
cd "$(dirname "$0")"
source .env
MAIL_FROM="${MAIL_FROM:-site@${SITE_DOMAIN}}"
MAIL_TO="${MAIL_TO:-zakaz@${SITE_DOMAIN}}"

read -rsp "Пароль для ${MAIL_FROM}: " SITE_PASS; echo
read -rsp "Пароль для ${MAIL_TO}: " ZAKAZ_PASS; echo

docker exec abatek-mailserver setup email add "${MAIL_FROM}" "${SITE_PASS}"
docker exec abatek-mailserver setup email add "${MAIL_TO}" "${ZAKAZ_PASS}"
docker exec abatek-mailserver setup config dkim domain "${SITE_DOMAIN}"

echo ">>> Ящики созданы. DKIM-ключ для DNS:"
docker exec abatek-mailserver cat "/tmp/docker-mailserver/rspamd/dkim/rsa-2048-mail-${SITE_DOMAIN}.public.txt" || true
echo ">>> Не забудь DNS: MX -> mail.${SITE_DOMAIN}, A mail -> IP VPS, SPF: 'v=spf1 mx -all'"
