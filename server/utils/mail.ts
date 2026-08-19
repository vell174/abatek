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

export async function sendRequestMail(payload: RequestMailPayload): Promise<void> {
  const mailer = getTransporter();
  if (!mailer) return;
  const { mailFrom, mailTo } = useRuntimeConfig();
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
      `Страница: ${payload.page || '—'}`,
    ].join('\n'),
  });
}
