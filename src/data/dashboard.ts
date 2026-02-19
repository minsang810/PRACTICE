export const todaySummary = [
  "미국 CPI 둔화 기대감으로 기술주 중심 매수세가 강화되었습니다.",
  "원/달러 환율은 장중 1,330원대에서 등락하며 외국인 수급이 혼조를 보였습니다.",
  "반도체·2차전지·방산 테마는 거래대금 상위권을 유지하며 변동성이 확대됐습니다.",
];

export const marketSnapshots = [
  { label: "KOSPI", value: "2,742.55", change: "+0.82%" },
  { label: "KOSDAQ", value: "881.90", change: "-0.21%" },
  { label: "USD/KRW", value: "1,334.20", change: "+0.35%" },
  { label: "NASDAQ", value: "17,880.31", change: "+1.12%" },
];

export const themes = [
  { title: "AI 반도체", note: "수요 전망 상향", trend: "강세" },
  { title: "2차전지", note: "업황 저점 통과 기대", trend: "중립" },
  { title: "방산", note: "수출 계약 모멘텀", trend: "강세" },
  { title: "바이오", note: "임상 결과 대기", trend: "약세" },
  { title: "친환경 에너지", note: "정책 수혜 기대", trend: "중립" },
  { title: "엔터/콘텐츠", note: "해외 매출 성장", trend: "강세" },
];

export const topNews = Array.from({ length: 10 }, (_, idx) => ({
  id: idx + 1,
  title: `주요 경제 뉴스 헤드라인 ${idx + 1}`,
  source: ["연합", "블룸버그", "로이터", "한국경제"][idx % 4],
  time: `${8 + idx}:00`,
}));

export const watchlist = [
  { ticker: "005930", name: "삼성전자", price: "84,300원", change: "+1.32%" },
  { ticker: "000660", name: "SK하이닉스", price: "223,500원", change: "+2.11%" },
  { ticker: "035420", name: "NAVER", price: "193,800원", change: "-0.46%" },
  { ticker: "207940", name: "삼성바이오로직스", price: "846,000원", change: "+0.24%" },
  { ticker: "051910", name: "LG화학", price: "341,500원", change: "-1.05%" },
  { ticker: "373220", name: "LG에너지솔루션", price: "388,000원", change: "+0.90%" },
];
