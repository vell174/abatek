import { z } from 'zod';
import { getDbPool, ensureSchema } from '../utils/db';
import { sendRequestMail } from '../utils/mail';
import { deliverRequestMail } from '../utils/mail-delivery';

const requestSchema = z.object({
  name: z.string().trim().min(1, 'Укажите имя').max(200),
  phone: z.string().trim().min(5, 'Укажите телефон').max(50),
  email: z.union([z.string().trim().email('Некорректный e-mail').max(200), z.literal('')]).default(''),
  message: z.string().trim().max(2000).default(''),
  page: z.string().trim().max(500).default(''),
});

export default defineEventHandler(async (event) => {
  const parsed = await readValidatedBody(event, (body) => requestSchema.safeParse(body));
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message ?? 'Некорректные данные формы',
    });
  }
  const { name, phone, email, message, page } = parsed.data;

  const db = getDbPool();
  if (db) {
    await ensureSchema(db);
    const result = await db.query(
      'INSERT INTO requests (name, phone, email, message, page) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, phone, email, message, page],
    );
    const requestId = Number(result.rows[0]?.id);
    // Первая попытка отправки сразу; при неудаче статус 'failed' — добьёт фоновый повтор
    await deliverRequestMail(db, { id: requestId, name, phone, email, message, page });
  } else {
    // Без БД шлём напрямую, ошибку не скрываем в проде логов
    try {
      await sendRequestMail({ id: null, name, phone, email, message, page });
    } catch (error) {
      console.error('[request] mail send failed:', error);
    }
  }

  return { ok: true };
});
