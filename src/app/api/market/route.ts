import { NextResponse } from "next/server";

type Quote = {
  value: number | null;
  changePct: number | null;
  asOf: string | null;
};

type MarketResponse = {
  updatedAt: string; // ISO time
  kospi: Quote;
  kosdaq: Quote; // 지금은 null로 두고, 다음 단계에서 채울 거야
  nasdaq: Quote;
  usdkrw: { value: number | null; asOf: string | null };
};

// Stooq HTML에서 대충 값 뽑기(형식이 바뀌면 null이 나올 수 있음)
function parseStooq(html: string): Quote {
  const lastMatch = html.match(/Last\s*([0-9]+(?:\.[0-9]+)?)/i);
  const changePctMatch = html.match(/\(\s*([+\-]?[0-9]+(?:\.[0-9]+)?)%\s*\)/i);
  const dateMatch = html.match(/([0-9]{1,2}\s+[A-Za-z]{3},\s+[0-9]{1,2}:[0-9]{2})/);

  return {
    value: lastMatch ? Number(lastMatch[1]) : null,
    changePct: changePctMatch ? Number(changePctMatch[1]) : null,
    asOf: dateMatch ? dateMatch[1] : null,
  };
}

export async function GET() {
  const updatedAt = new Date().toISOString();

  // USD/KRW (무료 환율 API)
  const fxUrl = "https://api.frankfurter.app/latest?from=USD&to=KRW";


  // KOSPI / NASDAQ (Stooq 지수 페이지)
  const kospiUrl = "https://stooq.com/q/?s=%5Ekospi";
  const nasdaqUrl = "https://stooq.com/q/?s=%5Endq";

  const fetchOpts: RequestInit & { next?: { revalidate: number } } = {
    next: { revalidate: 300 }, // 5분 캐시
    headers: { "user-agent": "Mozilla/5.0" },
  };

  const [fxRes, kospiRes, nasdaqRes] = await Promise.all([
    fetch(fxUrl, fetchOpts).catch(() => null),
    fetch(kospiUrl, fetchOpts).catch(() => null),
    fetch(nasdaqUrl, fetchOpts).catch(() => null),
  ]);

  const data: MarketResponse = {
    updatedAt,
    kospi: { value: null, changePct: null, asOf: null },
    kosdaq: { value: null, changePct: null, asOf: null }, // ✅ 다음 단계에서 채움
    nasdaq: { value: null, changePct: null, asOf: null },
    usdkrw: { value: null, asOf: null },
  };

  // USD/KRW
  if (fxRes && fxRes.ok) {
    const fxJson: any = await fxRes.json().catch(() => null);
    const v = fxJson?.rates?.KRW;
    if (typeof v === "number") data.usdkrw = { value: v, asOf: fxJson?.date ?? null };
  }

  // KOSPI
  if (kospiRes && kospiRes.ok) {
    const html = await kospiRes.text().catch(() => "");
    data.kospi = parseStooq(html);
  }

  // NASDAQ
  if (nasdaqRes && nasdaqRes.ok) {
    const html = await nasdaqRes.text().catch(() => "");
    data.nasdaq = parseStooq(html);
  }

  return NextResponse.json(data);
}
