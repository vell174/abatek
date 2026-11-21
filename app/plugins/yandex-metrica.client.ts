export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.afterEach((to, from) => {
    if (to.fullPath === from.fullPath) return;

    const url = new URL(to.fullPath, window.location.origin).href;
    const referer = new URL(from.fullPath, window.location.origin).href;
    window.ym?.(114438551, 'hit', url, { referer });
  });
});

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}
