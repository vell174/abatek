#!/usr/bin/env bash
# Проверка развёрнутой системы: DNS, HTTPS, сертификат, API заявок, база, почта.
#   sudo bash ops/check.sh
set -uo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Нет файла .env — сначала выполните: sudo bash ops/install.sh"; exit 1; }
set -a; . ./.env; set +a
POSTGRES_USER="${POSTGRES_USER:-abatek}"
POSTGRES_DB="${POSTGRES_DB:-abatek}"
MAIL_TO="${MAIL_TO:-zakaz@${SITE_DOMAIN}}"

FAILED=0
ok()   { printf '\033[1;32m  OK  \033[0m %s\n' "$1"; }
bad()  { printf '\033[1;31m ОШИБКА\033[0m %s\n' "$1"; FAILED=$((FAILED + 1)); }
warn() { printf '\033[1;33m ВНИМАНИЕ\033[0m %s\n' "$1"; }
step() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }

command -v dig >/dev/null 2>&1 || apt-get install -y dnsutils >/dev/null 2>&1 || true
command -v whois >/dev/null 2>&1 || apt-get install -y whois >/dev/null 2>&1 || true

step "DNS"
if ! getent hosts github.com >/dev/null 2>&1; then
  bad "Резолвер сервера не работает (проверьте /etc/resolv.conf) — выполните: sudo bash ops/install.sh"
fi
SERVER_IP="$(curl -fsS --max-time 10 https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')"
echo "  IP сервера: ${SERVER_IP}"
A_OK=1
for host in "$SITE_DOMAIN" "www.${SITE_DOMAIN}" "mail.${SITE_DOMAIN}"; do
  R="$(dig +short A "$host" | tail -n1)"
  if [ "$R" = "$SERVER_IP" ]; then ok "A ${host} -> ${R}"; else bad "A ${host} -> ${R:-нет записи} (ожидался ${SERVER_IP})"; A_OK=0; fi
done
MXR="$(dig +short MX "$SITE_DOMAIN" | tail -n1)"
case "$MXR" in *"mail.${SITE_DOMAIN}"*) ok "MX -> ${MXR}" ;; *) bad "MX -> ${MXR:-нет записи} (ожидался mail.${SITE_DOMAIN})" ;; esac
SPF="$(dig +short TXT "$SITE_DOMAIN" | grep -i 'v=spf1' | head -n1)"
[ -n "$SPF" ] && ok "SPF ${SPF}" || bad "SPF-запись не найдена (нужна TXT @ = v=spf1 mx -all)"
DMARC="$(dig +short TXT "_dmarc.${SITE_DOMAIN}" | head -n1)"
[ -n "$DMARC" ] && ok "DMARC ${DMARC}" || warn "DMARC-запись не найдена"
DKIM="$(dig +short TXT "mail._domainkey.${SITE_DOMAIN}" | head -n1)"
[ -n "$DKIM" ] && ok "DKIM запись есть" || warn "DKIM не найден — добавьте TXT mail._domainkey (см. README, шаг 4)"
PTR="$(dig +short -x "$SERVER_IP" | head -n1)"
case "$PTR" in "mail.${SITE_DOMAIN}."*) ok "PTR -> ${PTR}" ;; *) warn "PTR -> ${PTR:-не настроен} (желательно mail.${SITE_DOMAIN}) — настраивается в панели VPS" ;; esac

if [ "$A_OK" -ne 1 ]; then
  step "Диагностика DNS"
  WHOIS_OUT="$(whois "$SITE_DOMAIN" 2>/dev/null || true)"
  echo "$WHOIS_OUT" | grep -iE '^(nserver|state|created|paid-till|registrar)' | sed 's/^/  /' || true
  REG_NS="$(echo "$WHOIS_OUT" | awk '/^nserver:/ {print $2; exit}' | sed 's/\.$//')"
  ZONE_IP=""
  [ -n "$REG_NS" ] && ZONE_IP="$(dig +short A "$SITE_DOMAIN" "@${REG_NS}" 2>/dev/null | tail -n1)"
  if dig +trace "$SITE_DOMAIN" 2>/dev/null | grep -qE "^${SITE_DOMAIN}\.[[:space:]]+[0-9]+[[:space:]]+IN[[:space:]]+NS"; then
    if [ -n "$ZONE_IP" ] && [ "$ZONE_IP" != "$SERVER_IP" ]; then
      warn "Зона отдаёт ${ZONE_IP}, а сервер имеет ${SERVER_IP} — исправьте A-записи у регистратора."
    else
      warn "Домен делегирован, публичные резолверы ещё не обновили кэш — подождите."
    fi
  elif [ "$ZONE_IP" = "$SERVER_IP" ]; then
    warn "Записи в зоне верные (${REG_NS} -> ${ZONE_IP}), но делегирование ещё не опубликовано"
    warn "в зоне верхнего уровня. Для нового домена это нормально: 1-4 часа. Ничего делать не нужно."
  else
    warn "Домен не делегирован: укажите DNS-серверы регистратора (например ns1.reg.ru, ns2.reg.ru)."
  fi
  info "Проверять готовность: dig +short A ${SITE_DOMAIN} @8.8.8.8"
fi

step "Контейнеры"
docker compose ps
for c in abatek-traefik abatek-app abatek-postgres abatek-mailserver; do
  S="$(docker inspect -f '{{.State.Status}}' "$c" 2>/dev/null || echo "нет")"
  [ "$S" = "running" ] && ok "$c ${S}" || bad "$c ${S}"
done

step "Сайт"
CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://${SITE_DOMAIN}" 2>/dev/null)"
[ "$CODE" = "200" ] && ok "https://${SITE_DOMAIN} -> ${CODE}" || bad "https://${SITE_DOMAIN} -> ${CODE:-нет ответа}"
RCODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "http://${SITE_DOMAIN}" 2>/dev/null)"
case "$RCODE" in 30*) ok "http -> https редирект (${RCODE})" ;; *) warn "http вернул ${RCODE:-нет ответа}, ожидался редирект" ;; esac
ISSUER="$(echo | openssl s_client -connect "${SITE_DOMAIN}:443" -servername "${SITE_DOMAIN}" 2>/dev/null | openssl x509 -noout -issuer 2>/dev/null)"
case "$ISSUER" in *"Let's Encrypt"*) ok "Сертификат: ${ISSUER#issuer=}" ;; *) bad "Сертификат не от Let's Encrypt: ${ISSUER:-не получен}" ;; esac

step "API заявок"
RESP="$(curl -s --max-time 20 -X POST "https://${SITE_DOMAIN}/api/request" -H 'Content-Type: application/json' \
  -d '{"name":"Проверка check.sh","phone":"+70000000000","email":"","message":"автоматическая проверка","page":"/check"}' 2>/dev/null)"
case "$RESP" in *'"ok":true'*) ok "POST /api/request -> ${RESP}" ;; *) bad "POST /api/request -> ${RESP:-нет ответа}" ;; esac

step "База данных: последние заявки"
sleep 3
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
  -c "SELECT id, created_at, name, phone, mail_status FROM requests ORDER BY id DESC LIMIT 5;" 2>/dev/null \
  || bad "Не удалось прочитать таблицу requests"
STATUS="$(docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tA \
  -c "SELECT mail_status FROM requests ORDER BY id DESC LIMIT 1;" 2>/dev/null | tr -d '\r')"
case "$STATUS" in
  sent) ok "Письмо по последней заявке отправлено" ;;
  pending) warn "Письмо ещё отправляется (статус pending) — проверьте через минуту" ;;
  failed) bad "Письмо не отправлено (failed). Смотрите: sudo bash ops/requests.sh failed" ;;
  *) warn "Статус письма: ${STATUS:-неизвестен}" ;;
esac

step "Почта"
docker exec abatek-mailserver setup email list 2>/dev/null | grep -q "$MAIL_TO" \
  && ok "Ящик ${MAIL_TO} существует" || bad "Ящик ${MAIL_TO} не создан — выполните: sudo bash ops/mail-setup.sh"

step "Итог"
if [ "$FAILED" -eq 0 ]; then
  printf '\033[1;32mВсё работает. Осталось проверить вручную: письмо в ящике %s.\033[0m\n' "$MAIL_TO"
else
  printf '\033[1;31mНайдено проблем: %s. См. раздел «Если что-то пошло не так» в README.\033[0m\n' "$FAILED"
  exit 1
fi
