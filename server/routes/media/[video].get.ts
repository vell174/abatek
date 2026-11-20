import { createReadStream, statSync } from 'node:fs';
import { join } from 'node:path';
import { getHeader, getRouterParam, sendStream, setHeader, setResponseStatus } from 'h3';

const videoFiles = new Map([
  ['electron-knives.mp4', 'images/ispytanie-elektronozha-dlya-rezki-konveyernyh-lent-abatek-optimized.mp4'],
  ['konveyer-dlya-drovokola.mp4', 'videos/drovokoly/konveyer-dlya-drovokola.mp4'],
  ['konveyer-dlya-pogruzki-kolotyh-drov.mp4', 'videos/drovokoly/konveyer-dlya-pogruzki-kolotyh-drov.mp4'],
  ['transporter-dlya-drov-v-rabote.mp4', 'videos/drovokoly/transporter-dlya-drov-v-rabote.mp4'],
]);

export default defineEventHandler(async (event) => {
  const file = videoFiles.get(getRouterParam(event, 'video') ?? '');
  if (!file) throw createError({ statusCode: 404 });

  const filePath = join(process.cwd(), process.env.NODE_ENV === 'production' ? '.output/public' : 'public', file);
  const size = statSync(filePath).size;
  const range = getHeader(event, 'range');

  setHeader(event, 'Accept-Ranges', 'bytes');
  setHeader(event, 'Content-Type', 'video/mp4');
  setHeader(event, 'Cache-Control', 'public, max-age=2592000');

  if (!range) {
    setHeader(event, 'Content-Length', size);
    return sendStream(event, createReadStream(filePath));
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  const first = match?.[1];
  const last = match?.[2];
  const suffixLength = first === '' && last ? Number(last) : 0;
  const start = suffixLength ? Math.max(size - suffixLength, 0) : Number(first);
  const end = suffixLength ? size - 1 : last ? Math.min(Number(last), size - 1) : size - 1;

  if (
    !match ||
    (!first && !last) ||
    (first === '' && last === '0') ||
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start >= size ||
    start > end
  ) {
    setResponseStatus(event, 416);
    setHeader(event, 'Content-Range', `bytes */${size}`);
    return '';
  }

  setResponseStatus(event, 206);
  setHeader(event, 'Content-Range', `bytes ${start}-${end}/${size}`);
  setHeader(event, 'Content-Length', end - start + 1);
  return sendStream(event, createReadStream(filePath, { start, end }));
});
