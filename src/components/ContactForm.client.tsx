'use client';

export default function ContactFormClient() {
  return (
    <form className="mt-4 space-y-3">
      <div>
        <label className="text-[11px] text-slate-600">Имя / компания</label>
        <input
          type="text"
          className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder="Например: Иван, семья Б., компания В."
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-600">Контакт (Telegram / WhatsApp / e-mail)</label>
        <input
          type="text"
          className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder="@username / +XXX / email"
        />
      </div>
      <div>
        <label className="text-[11px] text-slate-600">Ваша задача</label>
        <textarea
          className="mt-1 min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
          placeholder="Например: нужен счёт и карты в Монако / кредитная линия под залог портфеля / крипто-ввод от 300k €."
        />
      </div>
      <button
        type="submit"
        className="mt-2 h-10 w-full rounded-full bg-red-600 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
      >
        Отправить
      </button>
      <p className="text-[10px] text-slate-500">
        Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности.
      </p>
    </form>
  );
}
