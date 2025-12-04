export default function ServicesPage() {
  const services = [
    {
      title: 'Премиальные банковские счета и карты в Монако',
      description:
        'Подбор банка, подготовка досье, сопровождение KYC/AML, открытие счёта и выпуск премиальных карт (Gold, Platinum, Infinite, Centurion-уровень по запросу).',
    },
    {
      title: 'Кредитные и дебетовые карты с высоким лимитом (до 1–5 млн €)',
      description:
        'Персональные кредитные и дебетовые решения для активных путешествий и бизнес-расходов с гибкими лимитами и премиальным сервисом.',
    },
    {
      title: 'Кредитование под залог активов',
      description:
        'Кредитные линии под залог недвижимости, инвестиционного портфеля, долей в бизнесе или криптовалюты — без распродажи базовых активов.',
    },
    {
      title: 'Приём и конвертация криптовалюты от 100 000 €',
      description:
        'Структурированный крипто-ввод: подготовка документов, подбор банков и платёжных провайдеров, сопровождение до зачисления средств на счёт.',
    },
    {
      title: 'Инвестиционные решения и семейные офисы',
      description:
        'Стратегия управления капиталом, отбор управляющих и фондов, запуск и сопровождение семейного офиса в Монако и других юрисдикциях.',
    },
    {
      title: 'Структурирование капитала и сопровождение KYC/AML',
      description:
        'Подготовка структуры владения, юридическое и налоговое структурирование, сопровождение сложных KYC и compliance-процессов.',
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
              Услуги
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Банковская инфраструктура и семейный офис под ключ
            </h1>
            <p className="mt-4 text-sm text-slate-600">
              Мы работаем как private office: от первой консультации до получения вами счёта, карт, кредитной линии и
              инвестиционной стратегии. Все решения настраиваются под вашу страну резидентности, источник капитала и
              цели.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
              >
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">{service.title}</h2>
                  <p className="mt-3 text-xs text-slate-600">{service.description}</p>
                </div>
                <button className="mt-4 inline-flex items-center text-[11px] font-semibold text-red-600 hover:text-red-700">
                  Обсудить эту услугу
                  <span className="ml-1">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


