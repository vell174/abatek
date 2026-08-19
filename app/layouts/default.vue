<template>
  <div>
    <SiteHeader />
    <main><slot /></main>
    <LazyRequestSection hydrate-on-visible />
    <SiteFooter />
    <LazyCookieBanner hydrate-on-idle />
  </div>
</template>
