export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">О компании</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Monaco Financial Solution — ваш семейный офис в Монако
            </h1>
            <p className="text-sm text-slate-600">
              Мы создаём и сопровождаем финансовую инфраструктуру для частных клиентов и семей с капиталом от
              100&nbsp;000&nbsp;€ до 50+ млн €. Наша задача — чтобы все вопросы, связанные с банками, кредитами и
              инвестициями, решались через одно окно в Монако.
            </p>
            <div className="grid gap-4 text-sm text-slate-700 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Опыт</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">10+ лет</p>
                <p className="mt-1 text-xs text-slate-500">в private banking и wealth management</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Счета</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">400+</p>
                <p className="mt-1 text-xs text-slate-500">открытых счетов в банках Монако, Швейцарии и ЕС</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">География</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">HNWI / UHNWI</p>
                <p className="mt-1 text-xs text-slate-500">клиенты из Европы, Ближнего Востока и СНГ</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Мы работаем в тесном партнёрстве с банками, управляющими компаниями, юридическими и налоговыми советниками
              в Монако и за его пределами. Это позволяет быстро собирать команды под конкретный кейс и сохранять при
              этом единое окно коммуникации для клиента.
            </p>
            <p className="text-sm text-slate-600">
              Формат работы — строго конфиденциальный. После первичной консультации и базового KYC мы готовим
              индивидуальную карту возможностей и рисков, а затем структурируем проект под ваши цели и ограничения.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
