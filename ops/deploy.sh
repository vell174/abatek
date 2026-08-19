#!/usr/bin/env bash
# Обновление сайта из GitHub: git pull + пересборка + перезапуск.
#   sudo bash ops/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "$(id -u)" -ne 0 ]; then exec sudo -E bash "$0" "$@"; fi

[ -f .env ] || { echo "Нет файла .env — сначала выполните: sudo bash ops/install.sh"; exit 1; }

echo ">>> Загружаю изменения из GitHub..."
git pull --ff-only

if ! grep -q '^BASIC_AUTH_USER=' .env; then
  BASIC_AUTH_PASSWORD="$(openssl rand -hex 16)"
  printf '\nBASIC_AUTH_USER=abatek\nBASIC_AUTH_PASSWORD=%s\n' "$BASIC_AUTH_PASSWORD" >> .env
  chmod 600 .env
  echo ">>> Basic Auth включён. Логин: abatek, пароль: ${BASIC_AUTH_PASSWORD}"
fi

echo ">>> Пересобираю и перезапускаю сайт..."
docker compose up -d --build
docker image prune -f >/dev/null

echo ">>> Готово."
docker compose ps
