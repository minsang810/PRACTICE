import {
  marketSnapshots,
  themes,
  todaySummary,
  topNews,
  watchlist,
} from "@/data/dashboard";

const today = new Date().toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

const changeColor = (value: string) =>
  value.startsWith("+") ? "text-emerald-600" : value.startsWith("-") ? "text-rose-600" : "text-slate-600";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">경제 뉴스 요약 · 주식 인사이트</p>
              <h1 className="text-2xl font-bold">이코노인사이트 대시보드</h1>
            </div>
            <div className="flex w-full max-w-xl items-center gap-3 md:w-auto">
              <input
                type="search"
                placeholder="관심 키워드/종목 검색"
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500"
              />
              <span className="whitespace-nowrap text-sm font-medium text-slate-500">{today}</span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">오늘의 3줄 요약</h2>
            <ol className="space-y-3 text-sm leading-relaxed text-slate-700">
              {todaySummary.map((item, idx) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                    {idx + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-lg font-semibold">시장 스냅샷</h2>
            <div className="grid grid-cols-2 gap-3">
              {marketSnapshots.map((item) => (
                <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-base font-semibold">{item.value}</p>
                  <p className={`text-sm font-medium ${changeColor(item.change)}`}>{item.change}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-semibold">테마 카드</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <article key={theme.title} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{theme.title}</h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      theme.trend === "강세"
                        ? "bg-emerald-100 text-emerald-700"
                        : theme.trend === "약세"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {theme.trend}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{theme.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-lg font-semibold">주요 뉴스 (Top 10)</h2>
            <ul className="space-y-3">
              {topNews.map((news) => (
                <li key={news.id} className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 text-sm last:border-none last:pb-0">
                  <p>
                    <span className="mr-2 font-semibold text-blue-600">#{news.id}</span>
                    {news.title}
                  </p>
                  <div className="whitespace-nowrap text-xs text-slate-500">
                    {news.source} · {news.time}
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-lg font-semibold">관심 종목</h2>
            <ul className="space-y-3">
              {watchlist.map((stock) => (
                <li key={stock.ticker} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold">{stock.name}</p>
                    <p className="text-xs text-slate-500">{stock.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stock.price}</p>
                    <p className={`text-xs font-semibold ${changeColor(stock.change)}`}>{stock.change}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
