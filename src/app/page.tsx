import CasesSection from '@/components/CasesSection';
import ContactForm from '@/components/ContactForm';
import PricingSection from '@/components/PricingSection';

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-10rem] h-80 w-80 rounded-full bg-red-100 blur-3xl" />
          <div className="absolute right-[-10rem] top-40 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-24 lg:px-6">
          <div className="max-w-xl space-y-6">
            <p className="text-xs font-semibold tracking-[0.35em] text-slate-500 uppercase">Family Office под ключ</p>
            <h1 className="text-balance text-4xl font-light tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Одно окно для всех ваших <span className="font-semibold text-red-600">финансовых задач в Монако</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Банковские счета и карты · Кредитные линии · Инвестиции · Приём и конвертация криптовалюты от
              100&nbsp;000&nbsp;€ — всё под ключ, конфиденциально и в формате семейного офиса.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
              >
                Обсудить мою задачу
              </a>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-700">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  ✓
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold">100% результат за 90 дней</span>
                  <span className="text-[11px] text-slate-500">или полный возврат гонорара по договору</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <div>
                10+ лет в private banking · Более 400 открытых счетов · Индивидуальные решения для HNWI и компаний
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-md">
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full border border-red-200" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Private Banking Monaco</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                  HNWI / UHNWI
                </span>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-900">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-500">Клиент А.</p>
                    <p className="text-sm font-medium">1,2 млн $ в USDT → счёт в Монако + карта Infinite</p>
                  </div>
                  <span className="text-[11px] text-emerald-600">28 дней</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-500">Семья Б.</p>
                    <p className="text-sm font-medium">Кредит 4 млн € под залог недвижимости в Дубае</p>
                  </div>
                  <span className="text-[11px] text-amber-600">45 дней</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-500">Компания В.</p>
                    <p className="text-sm font-medium">Счёт + приём криптовалюты в европейском банке</p>
                  </div>
                  <span className="text-[11px] text-sky-600">crypto onboarding</span>
                </div>
              </div>
              <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
                <p>Конфиденциальные анонимные кейсы. Подробности и персональное решение после KYC-консультации.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-slate-200 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Услуги</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Премиальные банковские и инвестиционные решения
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600">
                Работаем с частными клиентами и компаниями с капиталом от 100&nbsp;000&nbsp;€. Все решения
                разрабатываются индивидуально под вашу юрисдикцию, источник средств и риск-профиль.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Премиальные банковские счета и карты в Монако',
              'Кредитные и дебетовые карты с высоким лимитом (до 1–5 млн €)',
              'Кредитование под залог активов (недвижимость, портфель, криптовалюта)',
              'Приём и конвертация криптовалюты в традиционные банки от 100 000 €',
              'Инвестиционные решения и семейные офисы',
              'Структурирование капитала и сопровождение KYC/AML',
            ].map((title) => (
              <div
                key={title}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-300 hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-xs text-slate-600">
                    Решения под ключ через банки Монако, Швейцарии и ЕС с учётом вашей налоговой резидентности и
                    структуры владения.
                  </p>
                </div>
                <button className="mt-4 inline-flex items-center text-[11px] font-semibold text-red-600 group-hover:text-red-700">
                  Обсудить кейс
                  <span className="ml-1">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
        <PricingSection />
      </section>

      <section id="process" className="border-b border-slate-200 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Как это работает</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                5 шагов до счёта, карт и кредитной линии
              </h2>
            </div>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              'Вы оставляете заявку',
              'Мы изучаем ваш кейс (24–48 ч)',
              'Предлагаем 2–3 лучших решения',
              'Подписываем договор и начинаем работу',
              'Вы получаете счёт, карты, кредит — всё под ключ',
            ].map((step, index) => (
              <li key={step} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-xs font-semibold text-slate-500">Шаг {index + 1}</span>
                <p className="mt-2 text-sm text-slate-900">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="cases" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-20">
        <section className="mx-auto max-w-6xl px-4 lg:px-6">
          <CasesSection />
        </section>
      </section>

      <section id="contacts" className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Контакты</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Обсудим вашу задачу конфиденциально
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600">
                Напишите в удобный мессенджер или оставьте заявку. Мы вернёмся с первичным видением по вашему кейсу в
                течение 24–48 часов.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">Telegram</span>
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:border-slate-400"
                  >
                    Написать в Telegram
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">WhatsApp</span>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:border-slate-400"
                  >
                    Написать в WhatsApp
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500">Телефон</span>
                  <span className="text-sm text-slate-900">+377 XXX XXX XXX</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-xs font-semibold tracking-wide text-slate-900">Заявка на консультацию</p>
              <p className="mt-1 text-xs text-slate-600">
                Укажите минимально необходимую информацию — мы зададим точные вопросы уже на созвоне.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
