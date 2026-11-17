type CookieConsent = 'all' | 'necessary';
type Metrica = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
  interface Window {
    ym?: Metrica;
  }
}

const counterId = 94587624;
const tagUrl = 'https://mc.yandex.ru/metrika/tag.js';

export default defineNuxtPlugin(() => {
  const consentCookie = useCookie<CookieConsent | null>('abatek_cookie_consent');
  const consent = useState<CookieConsent | null>('abatek-cookie-consent', () => consentCookie.value);
  consent.value = consentCookie.value;
  const router = useRouter();
  let lastReportedUrl = '';

  function reportPage(url: string, referer: string) {
    if (url === lastReportedUrl) return;
    window.ym?.(counterId, 'hit', url, { referer });
    lastReportedUrl = url;
  }

  function startMetrica() {
    if (document.querySelector(`script[src="${tagUrl}"]`)) return;

    const queue: Metrica = (...args) => {
      (queue.a ??= []).push(args);
    };
    queue.l = Date.now();
    window.ym = window.ym ?? queue;

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = tagUrl;
    document.head.appendChild(tag);

    window.ym(counterId, 'init', {
      defer: true,
      clickmap: true,
      accurateTrackBounce: true,
      trackLinks: true,
    });
    reportPage(window.location.href, document.referrer);
  }

  watch(
    consent,
    (value) => {
      if (value === 'all') startMetrica();
    },
    { immediate: true },
  );

  router.afterEach((to, from) => {
    if (consent.value !== 'all') return;
    reportPage(new URL(to.fullPath, window.location.origin).href, new URL(from.fullPath, window.location.origin).href);
  });
});
