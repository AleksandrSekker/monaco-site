# Sanity Schema для Monaco Financial Solution

Этот файл содержит описание схем данных, которые нужно создать в Sanity Studio.

## Настройка Sanity

1. Создайте проект на https://sanity.io
2. Создайте dataset (например, `production`)
3. Получите Project ID из настроек проекта
4. Добавьте переменные окружения в `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

## Схемы данных

### 1. Hero (Главный экран)

```javascript
{
  _type: 'hero',
  title: 'Одно окно для всех ваших финансовых задач в Монако',
  subtitle: 'Банковские счета и карты · Кредитные линии · Инвестиции · Приём и конвертация криптовалюты от 100 000 €',
  ctaText: 'Обсудить мою задачу',
  guaranteeText: '100% результат за 90 дней',
  guaranteeSubtext: 'или полный возврат гонорара по договору',
  stats: '10+ лет в private banking · Более 400 открытых счетов · Индивидуальные решения для HNWI и компаний'
}
```

### 2. Service (Услуги)

```javascript
{
  _type: 'service',
  title: 'Премиальные банковские счета и карты в Монако',
  description: 'Подбор банка, подготовка досье, сопровождение KYC/AML...',
  order: 1
}
```

### 3. PricingTier (Тарифы)

```javascript
{
  _type: 'pricingTier',
  name: 'Essential',
  range: 'от 100–500k €',
  fee: '9 900 – 19 900 €',
  description: 'Для первых шагов в европейском private banking.',
  highlight: 'Базовая инфраструктура...',
  order: 1
}
```

### 4. Case (Кейсы)

```javascript
{
  _type: 'case',
  title: 'Клиент А. — 1,2 млн $ в USDT',
  result: 'Счёт в Монако + карта Infinite за 28 дней',
  details: 'Клиент с криптовалютным капиталом...',
  duration: '28 дней',
  order: 1
}
```

### 5. BlogPost (Статьи блога)

```javascript
{
  _type: 'blogPost',
  title: 'Где открыть счёт в Европе в 2026 году',
  slug: { current: 'gde-otkryt-schet-v-evrope-2026' },
  description: 'Обзор ключевых юрисдикций...',
  content: [...], // Portable Text
  publishedAt: '2024-01-01',
  image: {...} // Image reference
}
```

### 6. About (О компании)

```javascript
{
  _type: 'about',
  title: 'Monaco Financial Solution — ваш семейный офис в Монако',
  description: 'Мы создаём и сопровождаем финансовую инфраструктуру...',
  stats: [
    { label: 'Опыт', value: '10+ лет', subtext: 'в private banking' },
    { label: 'Счета', value: '400+', subtext: 'открытых счетов' },
    { label: 'География', value: 'HNWI / UHNWI', subtext: 'клиенты из Европы...' }
  ],
  content: 'Мы работаем в тесном партнёрстве...'
}
```

### 7. Contact (Контакты)

```javascript
{
  _type: 'contact',
  telegram: 'https://t.me/Monacofinancialsolution',
  whatsapp: 'https://wa.me/377640626753',
  phone: '+377-640-626-753',
  email: 'info@monacofinancialsolution.com'
}
```

## Создание схем в Sanity Studio

Для создания этих схем в Sanity Studio, используйте Sanity Schema Language или создайте их через веб-интерфейс Studio.

Альтернативно, можно установить Sanity Studio локально:

```bash
npm install -g @sanity/cli
sanity init
```
