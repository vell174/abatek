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
  BASIC_AUTH_HASH="$(openssl passwd -apr1 "$BASIC_AUTH_PASSWORD")"
  BASIC_AUTH_HASH="${BASIC_AUTH_HASH//$/\$\$}"
  printf '\nBASIC_AUTH_USER=abatek\nBASIC_AUTH_PASSWORD=%s\nBASIC_AUTH_HASH=%s\n' \
    "$BASIC_AUTH_PASSWORD" "$BASIC_AUTH_HASH" >> .env
  chmod 600 .env
  echo ">>> Basic Auth включён. Логин: abatek, пароль: ${BASIC_AUTH_PASSWORD}"
fi

if ! grep -q '^BASIC_AUTH_HASH=.' .env; then
  BASIC_AUTH_PASSWORD="$(grep '^BASIC_AUTH_PASSWORD=' .env | cut -d= -f2-)"
  BASIC_AUTH_HASH="$(openssl passwd -apr1 "$BASIC_AUTH_PASSWORD")"
  BASIC_AUTH_HASH="${BASIC_AUTH_HASH//$/\$\$}"
  sed -i "s|^BASIC_AUTH_HASH=.*|BASIC_AUTH_HASH=${BASIC_AUTH_HASH}|" .env
fi

echo ">>> Пересобираю и перезапускаю сайт..."
docker compose up -d --build
docker image prune -f >/dev/null

echo ">>> Готово."
docker compose ps
