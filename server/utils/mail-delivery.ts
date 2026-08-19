import type { Pool } from 'pg';
import { getDbPool, ensureSchema } from './db';
import { sendRequestMail } from './mail';
import type { RequestMailPayload } from './mail';

const MAX_ATTEMPTS = 10;

/** Пытается отправить письмо по заявке и фиксирует результат в БД. */
export async function deliverRequestMail(db: Pool, payload: RequestMailPayload & { id: number }): Promise<boolean> {
  try {
    await sendRequestMail(payload);
    await db.query(`UPDATE requests SET mail_status = 'sent', mail_error = '' WHERE id = $1`, [payload.id]);
    return true;
  } catch (error) {
    const text = error instanceof Error ? error.message : String(error);
    await db.query(
      `UPDATE requests
       SET mail_status = 'failed', mail_attempts = mail_attempts + 1, mail_error = $2
       WHERE id = $1`,
      [payload.id, text.slice(0, 1000)],
    );
    console.error(`[mail] заявка №${payload.id}: отправка не удалась:`, text);
    return false;
  }
}

/** Повторная отправка писем по заявкам, которые не ушли (вызывается по расписанию). */
export async function retryFailedMail(): Promise<void> {
  const db = getDbPool();
  if (!db) return;
  await ensureSchema(db);
  const { rows } = await db.query(
    `SELECT id, name, phone, email, message, page FROM requests
     WHERE mail_status <> 'sent' AND mail_attempts < $1
     ORDER BY id
     LIMIT 20`,
    [MAX_ATTEMPTS],
  );
  for (const row of rows) {
    const ok = await deliverRequestMail(db, row);
    if (ok) console.info(`[mail] заявка №${row.id}: письмо отправлено повторной попыткой`);
  }
}
