#!/usr/bin/env bash
# Перенос писем из стандартных английских IMAP-папок в русские и удаление английских папок.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "$(id -u)" -ne 0 ]; then exec sudo -E bash "$0" "$@"; fi

for _attempt in $(seq 1 30); do
  if docker exec abatek-mailserver doveadm user '*' >/dev/null 2>&1; then break; fi
  sleep 2
done

if ! users="$(docker exec abatek-mailserver doveadm user '*')"; then
  echo ">>> Dovecot не готов: не удалось получить список почтовых пользователей." >&2
  exit 1
fi

localize_mailbox() {
  local user="$1" source="$2" target="$3" mailboxes
  mailboxes="$(docker exec abatek-mailserver doveadm mailbox list -u "$user")"

  if ! grep -Fxq "$target" <<<"$mailboxes"; then
    docker exec abatek-mailserver doveadm mailbox create -u "$user" -s "$target"
  fi

  if grep -Fxq "$source" <<<"$mailboxes"; then
    docker exec abatek-mailserver doveadm move -u "$user" "$target" mailbox "$source" all
    docker exec abatek-mailserver doveadm mailbox delete -u "$user" -s "$source"
    echo ">>> ${user}: ${source} -> ${target}"
  fi
}

while IFS= read -r user; do
  [ -n "$user" ] || continue
  localize_mailbox "$user" Drafts Черновики
  localize_mailbox "$user" Sent Отправленные
  localize_mailbox "$user" Junk Спам
  localize_mailbox "$user" Trash Корзина
  localize_mailbox "$user" Archive Архив
done <<<"$users"

echo ">>> Английские служебные папки удалены, письма перенесены в русские."
