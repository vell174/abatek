# AGENTS.md — правила работы агента в проекте АБАТЭК

Документ описывает стек, структуру, конвенции Vue/Nuxt и правила стилей (БЭМ).
Читать перед любой правкой кода. Для задач переноса страниц с abatek.ru дополнительно
действует `AGENT_PAGE_MIGRATION_PLAN.md`.

---

## 1. Стек и команды

| Параметр     | Значение                                                       |
| ------------ | -------------------------------------------------------------- |
| Фреймворк    | Nuxt 4.5 (SSR + prerender), Vue 3.5 `<script setup lang="ts">` |
| Node         | 24.x                                                           |
| Стили        | SCSS (`sass-embedded`), scoped, БЭМ                            |
| UI-примитивы | `reka-ui`, карусели — `embla-carousel-vue`                     |
| Иконки       | `@nuxt/icon` + `@iconify-json/lucide`                          |
| Шрифт        | `@fontsource-variable/montserrat`                              |
| Линтеры      | ESLint (+ Prettier), Stylelint (standard-scss + recess-order)  |

Команды (запускать из корня; в PowerShell при ошибке политики скриптов —
`& $env:ComSpec /c "npm run lint"`):

```bash
npm run dev            # дев-сервер :3000
npm run build          # прод-сборка
npm run generate       # статическая генерация (prerender всех slug)
npm run lint           # eslint + stylelint  (базовое состояние: 0 ошибок)
npm run lint:fix
npm run format         # prettier
```

**Правило завершения задачи:** `npm run lint` обязан завершаться без ошибок.
Для правок, влияющих на маршруты/данные, дополнительно прогнать `npm run build`.

---

## 2. Структура проекта

```
app/
  app.vue                 # корневой враппер (NuxtLayout + NuxtPage)
  error.vue               # страница ошибок
  layouts/default.vue     # SiteHeader → <slot/> → RequestSection → SiteFooter → CookieBanner
  pages/
    index.vue             # главная
    [slug].vue            # универсальный роут оборудования (резолв через data/pages)
    kontakty.vue, o-kompanii.vue, primery-rabot.vue, politika-*.vue, ...
  components/
    home/                 # секции главной (HomeHero, HomeCategories, ...)
    equipment/            # шаблоны страниц оборудования (IndustrialEquipmentPage, SilosPage, ...)
    layout/               # SiteHeader, SiteFooter, RequestSection, RequestForm, CookieBanner, LegalPopup
    shared/
      sections/           # переиспользуемые секции страниц
      card/               # карточки товаров
      BreadcrumbsNavigation.vue
    ui/                   # атомы: UiButton, UiInput, UiCheckbox, AppLogo, LegalDocument
    contact/, projects/
  composables/usePageSeo.ts
  data/
    pages/<slug>/{data.ts, seo.ts, name-routers.ts, data-catalog.ts?}
    pages/_shared/        # types.ts, create-*-page.ts, faq.ts, workflow.ts, product-route.ts
    pages/index.ts        # реестр страниц: getEquipmentPage(slug), equipmentRoutes
    pages/equipment-routes.ts
    projects.ts, industrialPages.ts
  assets/styles/{_tokens.scss, _mixins.scss, main.scss}
public/images/            # все картинки, реальные, без заглушек
scripts/*.ps1             # генерация legacy-данных
```

Не трогать и не читать: `abatek-copy3/` (временная директория), `.nuxt/`, `.output/`,
`dist/`, `node_modules/`.

Автоимпорт компонентов включён с `pathPrefix: false` — компонент вызывается по имени файла
(`<UiButton>`, `<PageHeroSection_01>`) независимо от вложенности. **Имена файлов компонентов
должны быть уникальны по всему `app/components`.**

---

## 3. Модель страниц оборудования

Один динамический роут `app/pages/[slug].vue`:

1. `getEquipmentPage(slug)` из `app/data/pages/index.ts` отдаёт `EquipmentPageDefinition`.
2. Нет совпадения → `createError({ statusCode: 404 })`.
3. `usePageSeo(definition.seo)` навешивает мету, canonical, JSON-LD.
4. По `template` рендерится нужный компонент из `components/equipment/`
   (`industrial | electron-knives | screw-conveyors | reservoirs | silos | roller-conveyors`).

### Добавление новой страницы оборудования

1. Создать `app/data/pages/<slug>/`:
   - `name-routers.ts` → `export const routes: PageRoutes = { root, slugs: [...] }`;
   - `data.ts` → `export const pageData` (тип `IndustrialPage` или `{ title, description, image }`);
   - `seo.ts` → `export const seo: PageSeo` (см. `_shared/types.ts`, заполнять все поля,
     включая `breadcrumbs` и `schema`);
   - `data-catalog.ts` (опционально) → `export const catalog: IndustrialSection[]`.
2. Зарегистрировать slug:
   - шаблонная страница → добавить запись в `specialTemplates` (`app/data/pages/index.ts`);
   - страница с каталогом/явными данными → добавить объект в `industrialDefinitions`.
3. Проверить, что slug попадает в prerender (`equipmentRouteSlugs` в `equipment-routes.ts`).
4. Картинки положить в `public/images/`, пути в данных обязаны существовать.
5. `npm run lint` + `npm run build`.

Правила данных:

- Контент — только в `app/data/`, компоненты не содержат хардкод текстов страниц.
- Типы брать из `app/data/pages/_shared/types.ts`, не дублировать интерфейсы.
- Повторяющиеся блоки (FAQ, этапы работ) — через `_shared/faq.ts`, `_shared/workflow.ts`
  и фабрики `create-*-page.ts`.
- Таблицы характеристик — только через `SpecsTableSection`, самописные таблицы запрещены.

---

## 4. Конвенции Vue/Nuxt

- Только `<script setup lang="ts">`; порядок блоков: `script` → `template` → `style`.
- Пропсы типизировать generic-формой: `defineProps<{...}>()`;
  значения по умолчанию — деструктуризация или `withDefaults`.
- Nuxt-автоимпорты (`computed`, `ref`, `useState`, `useRoute`, `useHead`, ...) не импортировать
  вручную без необходимости; типы импортировать через `import type`.
- Алиас путей — `~/` (`~/data/pages`, `~/components/...`).
- Компоненты — PascalCase, минимум два слова (правило `vue/multi-word-component-names`;
  отключено только для `pages/` и `layouts/`).
  Существующие имена с суффиксами (`PageHeroSection_01`, `FaqSection_last_01`) — легаси;
  **новые файлы так не называть**, использовать чистый PascalCase.
- Новый компонент создавать только если нет подходящего в `components/shared` или `components/ui`.
  Сначала расширить существующий (пропсы/слоты), потом создавать новый.
- Общее состояние между компонентами — `useState('<ключ>', ...)`
  (пример: `useState('project-request-open', () => false)`).
- SEO только через `usePageSeo(seo)`; `useSeoMeta`/`useHead` в страницах напрямую не дублировать.
- Иконки: `<Icon name="lucide:xxx" />`; новую иконку обязательно добавить в
  `icon.clientBundle.icons` в `nuxt.config.ts`, иначе она не попадёт в бандл.
- Язык интерфейса — русский, `htmlAttrs.lang = 'ru'`.
- Доступность: осмысленные `alt`, `aria-*` для интерактивных элементов, не удалять
  `:focus-visible`-стили.

---

## 5. Стили: БЭМ + SCSS

### Обязательное

- Все стили компонента — в `<style scoped lang="scss">` этого компонента.
  Глобально правится только `app/assets/styles/main.scss`.
- `_tokens.scss` инжектится автоматически (`additionalData` в `nuxt.config.ts`) —
  переменные `$navy, $blue, $yellow, $ink, $muted, $line, $soft, $wide, $tablet, $phone`
  доступны без `@use`. Повторно подключать tokens в компоненте не нужно.
- `_mixins.scss` (`@include tablet`, `@include phone`) подключать явно:
  `@use '~/assets/styles/mixins' as *;`
- Цвета и брейкпоинты — только из токенов. Хардкод hex допустим лишь для `#fff`
  и уже существующих исключений; новый цвет — сначала добавить токен.

### Именование (проверяется Stylelint)

Паттерн: `block`, `block__element`, `block--modifier`, все части в kebab-case.

```
✅ .product-card, .product-card__title, .product-card--wide
❌ .productCard, .card__item__title, .card__item--big--red, .u_helper
```

Одна вложенность элемента (`__el__el` запрещено) и один модификатор в классе.

### Структура блока

```scss
.product-card {
  /* свойства блока */

  &:hover { ... }

  &__title { ... }

  &__title-note { ... }   // многословный элемент — через дефис

  &--featured { ... }

  &--featured &__title { ... }   // модификатор влияет на элемент
}

@include phone {
  .product-card { ... }
}
```

Правила:

- Имя блока = смысл компонента (`page-hero`, `ui-button`, `industrial-page`),
  для `ui/`-атомов — префикс `ui-` (`.ui-button`, `.ui-input`).
- Селекторы по тегам и вложенность по DOM-иерархии — запрещены; вложенность
  только через `&__` / `&--` / псевдоклассы. Глубина — максимум 3 уровня.
- Модификаторы в шаблоне вешать массивом:

  ```vue
  <div class="ui-button" :class="[`ui-button--${variant}`, `ui-button--${size}`]">
  ```

- Порядок свойств — `stylelint-config-recess-order` (правится `npm run lint:styles:fix`).
- Медиазапросы — `max-width` с токенами `$tablet` / `$phone` (mobile-last, как в проекте).
  Не вводить произвольные брейкпоинты.
- Прозрачность цвета — `rgba($navy, 0.9)`; в готовом CSS Stylelint ожидает `rgb(255 255 255 / 12%)`
  для литералов.
- Глобальные утилиты, доступные везде: `.site-container`, `.content-section`,
  `.content-section--soft`. Не переопределять их локально, использовать как есть.
- `:deep()` — только при стилизации внутренностей `reka-ui`, с комментарием-обоснованием.
- Анимации переходов страниц (`.page-enter-*`) менять только в `main.scss`.

---

## 6. Форматирование и линт

- Prettier: одинарные кавычки, `semi: true`, `printWidth: 120`, `trailingComma: all`, 2 пробела.
- ESLint: неиспользуемые переменные — ошибка (исключение — префикс `_`).
- Перед завершением задачи: `npm run lint` → 0 ошибок. Не отключать правила инлайн-комментариями
  без явного согласования.

---

## 7. Чек-лист перед сдачей задачи

1. [ ] Контент/тексты вынесены в `app/data`, компоненты переиспользованы, дублей нет.
2. [ ] Новые классы соответствуют БЭМ, цвета/брейкпоинты из токенов.
3. [ ] Новые иконки добавлены в `nuxt.config.ts`.
4. [ ] Пути к изображениям существуют в `public/images`.
5. [ ] Для новой страницы: `data.ts` + `seo.ts` + `name-routers.ts` + регистрация в `index.ts`.
6. [ ] `npm run lint` без ошибок.
7. [ ] `npm run build` проходит (если менялись роуты, данные или конфиг).
8. [ ] Не менялись `abatek-copy3/`, `.nuxt/`, `.output/`, `dist/`.

---

## 8. Запрещено

- Читать/править `abatek-copy3/` (временная директория).
- Хардкодить тексты страниц в компонентах.
- Создавать новый компонент при наличии подходящего shared-компонента.
- Плодить нестандартные брейкпоинты, цвета, глобальные CSS-файлы.
- Ставить заглушки вместо реальных изображений и данных.
- Добавлять новые линтеры/тест-раннеры/зависимости без запроса пользователя.
