#!/usr/bin/env bash
# Создание почтовых ящиков и DKIM-ключа. Вызывается из install.sh, можно запускать отдельно.
#   sudo bash ops/mail-setup.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "$(id -u)" -ne 0 ]; then exec sudo -E bash "$0" "$@"; fi

[ -f .env ] || { echo "Нет файла .env — сначала выполните: sudo bash ops/install.sh"; exit 1; }
set -a; . ./.env; set +a
MAIL_FROM="${MAIL_FROM:-site@${SITE_DOMAIN}}"
MAIL_TO="${MAIL_TO:-zakaz@${SITE_DOMAIN}}"
MAIL_ADMIN="${MAIL_ADMIN:-admin@${SITE_DOMAIN}}"

ms() { docker exec abatek-mailserver "$@"; }
# setup email list выводит результат в stderr, поэтому объединяем потоки
list_boxes() { timeout 20 docker exec abatek-mailserver setup email list 2>&1 || true; }

add_box() {
  local addr="$1" label="$2" pass
  if list_boxes | grep -qF "$addr"; then
    echo ">>> ${addr} уже существует — пропускаю (сменить пароль: setup email update ${addr})."
    return 0
  fi
  while :; do
    read -rsp "Пароль для ${addr} (${label}): " pass; echo
    [ -n "$pass" ] || { echo "    Пароль не может быть пустым."; continue; }
    break
  done
  if ms setup email add "$addr" "$pass"; then
    echo ">>> ${addr} создан."
  else
    echo ">>> Не удалось создать ${addr}. Проверьте: sudo docker exec abatek-mailserver setup email list"
  fi
}

add_box "$MAIL_FROM"  "отправитель писем сайта"
add_box "$MAIL_TO"    "сюда приходят заявки"
add_box "$MAIL_ADMIN" "системная почта"

# Служебные адреса домена ведут на системный ящик
for a in postmaster abuse hostmaster; do
  ms setup alias add "${a}@${SITE_DOMAIN}" "$MAIL_ADMIN" >/dev/null 2>&1 || true
done

ms setup config dkim domain "${SITE_DOMAIN}" || true

DKIM_RAW="$(ms cat "/tmp/docker-mailserver/rspamd/dkim/rsa-2048-mail-${SITE_DOMAIN}.public.txt" 2>/dev/null \
  || ms sh -c 'cat /tmp/docker-mailserver/rspamd/dkim/*public.txt' 2>/dev/null || true)"

# склеить многострочное значение в одну строку для вставки в панель DNS
DKIM_VALUE="$(printf '%s' "$DKIM_RAW" | tr -d '\n' | grep -o '"[^"]*"' | tr -d '"' | tr -d '\n')"

echo
echo ">>> Ящики созданы: ${MAIL_FROM}, ${MAIL_TO}, ${MAIL_ADMIN} (системный)."
echo
if [ -n "$DKIM_VALUE" ]; then
  echo ">>> Добавьте в DNS запись:  тип TXT,  имя mail._domainkey,  значение (одной строкой):"
  echo "---------------------------------------------------------------"
  echo "$DKIM_VALUE"
  echo "---------------------------------------------------------------"
  echo ">>> Показать снова: sudo bash ops/mail-setup.sh"
else
  echo ">>> DKIM-ключ не найден. Повторите: sudo docker exec abatek-mailserver setup config dkim domain ${SITE_DOMAIN}"
fi
echo ">>> Проверьте DNS: MX -> mail.${SITE_DOMAIN}, A mail -> IP сервера, SPF 'v=spf1 mx -all'."
