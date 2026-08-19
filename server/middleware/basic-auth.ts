import { timingSafeEqual } from 'node:crypto';

export default defineEventHandler((event) => {
  if (import.meta.prerender) {
    return;
  }

  const { basicAuthUser, basicAuthPassword } = useRuntimeConfig(event);

  if (!basicAuthUser || !basicAuthPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Basic Auth is not configured',
    });
  }

  const authorization = getHeader(event, 'authorization');
  const expectedAuthorization = `Basic ${Buffer.from(`${basicAuthUser}:${basicAuthPassword}`).toString('base64')}`;
  const authorizationBuffer = Buffer.from(authorization ?? '');
  const expectedAuthorizationBuffer = Buffer.from(expectedAuthorization);
  const isAuthorized =
    authorizationBuffer.length === expectedAuthorizationBuffer.length &&
    timingSafeEqual(authorizationBuffer, expectedAuthorizationBuffer);

  if (!isAuthorized) {
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Abatek", charset="UTF-8"');
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required',
    });
  }
});
