"use client";

import { useEffect, useState } from "react";

type Quote = { value: number | null; changePct: number | null; asOf: string | null };
type MarketResponse = {
  updatedAt: string;
  kospi: Quote;
  kosdaq: Quote;
  nasdaq: Quote;
  usdkrw: { value: number | null; asOf: string | null };
};

function fmtNumber(n: number | null | undefined, digits = 2) {
  if (n === null || n === undefined || Number.isNaN(n)) return "N/A";
  return n.toLocaleString("ko-KR", { maximumFractionDigits: digits });
}

export default function MarketSnapshot() {
  const [market, setMarket] = useState<MarketResponse | null>(null);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then(setMarket)
      .catch(() => setMarket(null));
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">시장 스냅샷</h2>
        <div className="text-xs text-slate-500">
          마지막 업데이트:{" "}
          {market?.updatedAt ? new Date(market.updatedAt).toLocaleString("ko-KR") : "불러오는 중"}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs text-slate-500">USD/KRW</div>
          <div className="mt-1 text-xl font-semibold">{fmtNumber(market?.usdkrw.value)}</div>
          <div className="mt-1 text-xs text-slate-400">{market?.usdkrw.asOf ?? ""}</div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs text-slate-500">KOSPI</div>
          <div className="mt-1 text-xl font-semibold">{fmtNumber(market?.kospi.value)}</div>
          <div className="mt-1 text-xs text-slate-400">
            {market?.kospi.changePct !== null && market?.kospi.changePct !== undefined
              ? `${market.kospi.changePct > 0 ? "+" : ""}${market.kospi.changePct}%`
              : ""}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs text-slate-500">NASDAQ</div>
          <div className="mt-1 text-xl font-semibold">{fmtNumber(market?.nasdaq.value)}</div>
          <div className="mt-1 text-xs text-slate-400">
            {market?.nasdaq.changePct !== null && market?.nasdaq.changePct !== undefined
              ? `${market.nasdaq.changePct > 0 ? "+" : ""}${market.nasdaq.changePct}%`
              : ""}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs text-slate-500">KOSDAQ</div>
          <div className="mt-1 text-xl font-semibold">{fmtNumber(market?.kosdaq.value)}</div>
          <div className="mt-1 text-xs text-slate-400">(다음 단계에서 연결)</div>
        </div>
      </div>
    </div>
  );
}
