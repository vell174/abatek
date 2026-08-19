# Структура сайта

## Главная

- Категории оборудования / SEO-страницы
  - /elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/
  - /vintovye-konvejery/
  - /rezervuary/
  - /silosy/
  - /rolgang/
  - /transporterdlyadrov/
  - /konveyery-skrebkovye/
  - /elevatory/
  - /shneki-konveera/
  - /shlyuzovyezatvory/
  - /komplektuyushie-k-konvejeram/
  - /ciklony/
  - /metallokonstruktsii-na-zakaz/
  - /lentochnye-konvejery/
  - ...

- Примеры работ

- Доставка и оплата

- О компании

- Контакты

- Юридические страницы
    - Политика конфиденциальности
    - Обработка персональных данных
    - Cookie

## Верхнее меню

- Категории (с выпадающим списком)
- Примеры работ
- Доставка
- О компании
- Контакты

## Пример URL

 - все url строго на СНГ и РУ сигмент рынок ни какого английского языка

## папка data/pages/ - в этой папке будут храниться все страницы сайта
   - папка с полным названием root названием страницы пример: `/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/`
   - в папке должны быть файлы:
     - `seo.ts` - все что связано с seo (title, description, keywords, shema, og, twitter, JSON-LD и т.к.д.)
     - `data.ts` - файл с данными для страницы (например, описание, характеристики, изображения)
     - `data-catalog.ts` - файл с данными для каталога список товаров возможно каталога неб удет на странице файл не обязательный
     - `name-routers.ts` - Здесь будут храниться все роутеры для страницы корневой и другие slug страницы на одну страницу может быть несколько url вести разных