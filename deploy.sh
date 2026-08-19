#!/usr/bin/env bash
# Деплой/обновление сайта: git pull + пересборка + перезапуск.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  cp .env.example .env
  echo ">>> Создан .env из .env.example — заполни SITE_DOMAIN, ACME_EMAIL, POSTGRES_PASSWORD!"
  exit 1
fi

git pull --ff-only || true
docker compose up -d --build
docker image prune -f
echo ">>> Готово: docker compose ps"
docker compose ps
