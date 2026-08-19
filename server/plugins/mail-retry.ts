import { retryFailedMail } from '../utils/mail-delivery';

const RETRY_INTERVAL_MS = 5 * 60 * 1000;

export default defineNitroPlugin(() => {
  if (import.meta.prerender) return;
  const run = () => {
    retryFailedMail().catch((error) => console.error('[mail] фоновый повтор упал:', error));
  };
  // Первый прогон вскоре после старта — добьёт письма, зависшие до рестарта
  setTimeout(run, 30 * 1000);
  setInterval(run, RETRY_INTERVAL_MS);
});
