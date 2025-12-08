# Инструкция по настройке Sanity CMS

## Шаг 1: Создание проекта Sanity

1. Перейдите на https://sanity.io и зарегистрируйтесь/войдите
2. Нажмите "Create new project"
3. Заполните:
   - Project name: `Monaco Financial Solution`
   - Dataset name: `production`
   - Output path: можно оставить по умолчанию или пропустить
4. После создания скопируйте **Project ID** из настроек проекта

## Шаг 2: Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Замените `your_project_id_here` на ваш Project ID из шага 1.

## Шаг 3: Создание схем в Sanity Studio

### Вариант A: Через веб-интерфейс (проще)

1. Перейдите в ваш проект на https://sanity.io/manage
2. Откройте Sanity Studio (кнопка "Open Studio")
3. В Studio создайте документы вручную через интерфейс

### Вариант B: Установка Sanity Studio локально (рекомендуется)

```bash
# В корне проекта
npm install -g @sanity/cli
sanity init --env

# Следуйте инструкциям:
# - Выберите "Create new project" или "Use existing project"
# - Выберите dataset: production
# - Выберите template: Clean project with no predefined schemas
```

После этого можно создать схемы через файлы в папке `schemas/`.

## Шаг 4: Создание контента

После настройки схем создайте документы:
- Hero (1 документ)
- Services (6 документов)
- PricingTier (3 документа)
- Cases (3+ документов)
- BlogPost (статьи блога)
- About (1 документ)
- Contact (1 документ)

## Шаг 5: Проверка

После создания контента сайт автоматически начнёт получать данные из Sanity.

## Полезные ссылки

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)





