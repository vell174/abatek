#!/usr/bin/env bash
# Просмотр и выгрузка заявок.
#   sudo bash ops/requests.sh          последние 20 заявок
#   sudo bash ops/requests.sh failed   заявки с неотправленными письмами
#   sudo bash ops/requests.sh csv      выгрузка всех заявок в zayavki.csv
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Нет файла .env — сначала выполните: sudo bash ops/install.sh"; exit 1; }
set -a; . ./.env; set +a
POSTGRES_USER="${POSTGRES_USER:-abatek}"
POSTGRES_DB="${POSTGRES_DB:-abatek}"

psql_run() { docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$@"; }

case "${1:-last}" in
  last)
    psql_run -c "SELECT id, created_at, name, phone, email, mail_status FROM requests ORDER BY id DESC LIMIT 20;"
    ;;
  failed)
    psql_run -c "SELECT id, created_at, name, phone, mail_attempts, mail_error FROM requests WHERE mail_status <> 'sent' ORDER BY id DESC;"
    echo ">>> Такие письма сайт автоматически пытается дослать каждые 5 минут."
    ;;
  csv)
    psql_run -c "\copy (SELECT * FROM requests ORDER BY id) TO STDOUT WITH CSV HEADER" > zayavki.csv
    echo ">>> Готово: $(pwd)/zayavki.csv ($(wc -l < zayavki.csv) строк)"
    ;;
  *)
    echo "Использование: sudo bash ops/requests.sh [last|failed|csv]"
    exit 1
    ;;
esac
