#!/usr/bin/env bash
# Обновление сайта из GitHub: git pull + пересборка + перезапуск.
#   sudo bash ops/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "$(id -u)" -ne 0 ]; then exec sudo -E bash "$0" "$@"; fi

[ -f .env ] || { echo "Нет файла .env — сначала выполните: sudo bash ops/install.sh"; exit 1; }

echo ">>> Загружаю изменения из GitHub..."
git pull --ff-only

echo ">>> Пересобираю и перезапускаю сайт..."
docker compose up -d --build
docker image prune -f >/dev/null

echo ">>> Готово."
docker compose ps
