import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const { smtpHost, smtpPort } = useRuntimeConfig();
  if (!smtpHost) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 25,
      secure: false,
      // Внутренний mailserver в docker-сети со self-signed сертификатом
      tls: { rejectUnauthorized: false },
    });
  }
  return transporter;
}

export interface RequestMailPayload {
  id: number | null;
  name: string;
  phone: string;
  email: string;
  message: string;
  page: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function phoneHref(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export async function sendRequestMail(payload: RequestMailPayload): Promise<void> {
  const mailer = getTransporter();
  if (!mailer) return;

  const { mailFrom, mailTo } = useRuntimeConfig();

  const name = escapeHtml(payload.name);
  const phone = escapeHtml(payload.phone);
  const phoneLink = phoneHref(payload.phone);
  const email = payload.email ? escapeHtml(payload.email) : '';
  const message = payload.message ? escapeHtml(payload.message) : '—';
  const page = payload.page ? escapeHtml(payload.page) : '—';

  const title = payload.id ? `Новая заявка №${payload.id}` : 'Новая заявка';

  await mailer.sendMail({
    from: `"Сайт АБАТЭК" <${mailFrom}>`,
    to: mailTo,
    replyTo: payload.email || undefined,
    subject: payload.id ? `Новая заявка с сайта №${payload.id}` : 'Новая заявка с сайта',

    text: [
      payload.id ? `Заявка №${payload.id}` : 'Заявка',
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      `E-mail: ${payload.email || '—'}`,
      `Сообщение: ${payload.message || '—'}`,
      `Страница, откуда была отправлена заявка: ${payload.page === '/' ? 'Главная страница' : payload.page || '—'}`,
    ].join('\n'),

    // HTML-версия
    html: `
      <!doctype html>
      <html lang="ru">
        <body style="
          margin: 0;
          padding: 24px;
          background: #f5f5f5;
          font-family: Arial, Helvetica, sans-serif;
          color: #222222;
        ">
          <div style="
            max-width: 640px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e5e5e5;
          ">

            <div style="
              padding: 24px 28px;
              background: #111827;
              color: #ffffff;
            ">
              <div style="
                font-size: 13px;
                opacity: .75;
                margin-bottom: 6px;
              ">
                АБАТЭК
              </div>

              <div style="
                font-size: 22px;
                font-weight: 700;
              ">
                ${title}
              </div>
            </div>

            <div style="padding: 28px;">

              <div style="
                margin-bottom: 22px;
                font-size: 16px;
              ">
                <div style="
                  color: #6b7280;
                  font-size: 12px;
                  text-transform: uppercase;
                  margin-bottom: 5px;
                ">
                  Имя
                </div>

                <strong>${name}</strong>
              </div>


              <div style="
                margin-bottom: 22px;
                font-size: 16px;
              ">
                <div style="
                  color: #6b7280;
                  font-size: 12px;
                  text-transform: uppercase;
                  margin-bottom: 5px;
                ">
                  Телефон
                </div>

                <a
                  href="tel:${phoneLink}"
                  style="
                    color: #2563eb;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 18px;
                  "
                >
                  ${phone}
                </a>
              </div>


              <div style="
                margin-bottom: 22px;
                font-size: 16px;
              ">
                <div style="
                  color: #6b7280;
                  font-size: 12px;
                  text-transform: uppercase;
                  margin-bottom: 5px;
                ">
                  E-mail
                </div>

                ${
                  email
                    ? `
                      <a
                        href="mailto:${email}"
                        style="
                          color: #2563eb;
                          text-decoration: none;
                          font-weight: 600;
                        "
                      >
                        ${email}
                      </a>
                    `
                    : '—'
                }
              </div>


              <div style="
                margin-bottom: 22px;
              ">
                <div style="
                  color: #6b7280;
                  font-size: 12px;
                  text-transform: uppercase;
                  margin-bottom: 7px;
                ">
                  Сообщение
                </div>

                <div style="
                  padding: 14px 16px;
                  background: #f9fafb;
                  border-radius: 8px;
                  line-height: 1.5;
                  white-space: pre-wrap;
                ">${message}</div>
              </div>


              <div>
                <div style="
                  color: #6b7280;
                  font-size: 12px;
                  text-transform: uppercase;
                  margin-bottom: 5px;
                ">
                  Страница, откуда была отправлена заявка:
                </div>

                <div style="
                  color: #6b7280;
                  font-size: 13px;
                ">
                  ${page === '/' ? 'Главная страница' : page}
                </div>
              </div>

            </div>
          </div>
        </body>
      </html>
    `,
  });
}
