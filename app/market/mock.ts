// app/market/mock.ts
import type { SearchItem, MarketType } from "./types";

export const MOCK_ITEMS: SearchItem[] = [
  {
    title: "SEO Article Engine",
    type: "wrktmp",
    shortDescription: "Generate structured SEO articles with audit logs.",
    longDescription: "Template workflow: brief → outline → draft → score → publish.",
    username: "lamina",
  },
  {
    title: "Customer Support Triage",
    type: "node-g",
    shortDescription: "Classify tickets and route to the right queue.",
    longDescription: "Includes sentiment + priority + category grouping.",
    username: "ops",
  },
  {
    title: "Email Sentiment Analysis",
    type: "node-c",
    shortDescription: "A custom python node that scores sentiment.",
    longDescription: "Drop-in node for your pipeline. Deterministic output mode.",
    username: "research",
  },
  {
    title: "Legal Doc Summarizer",
    type: "wrktmp",
    shortDescription: "Summarize contracts with risk flags.",
    longDescription: "Highlights clauses + red flags + action list.",
    username: "legal",
  },
];

export function mockSearch(opts: {
  searchTerm: string;
  type?: MarketType | "";
  skip?: number;
  take?: number;
}): SearchItem[] {
  const { searchTerm, type = "", skip = 0, take = 16 } = opts;
  const q = searchTerm.trim().toLowerCase();

  let filtered = MOCK_ITEMS;

  if (type) filtered = filtered.filter((x) => x.type === type);
  if (q) {
    filtered = filtered.filter(
      (x) =>
        x.title.toLowerCase().includes(q) ||
        x.shortDescription.toLowerCase().includes(q) ||
        (x.longDescription || "").toLowerCase().includes(q) ||
        x.username.toLowerCase().includes(q)
    );
  }

  return filtered.slice(skip, skip + take);
}

export function mockGetOne(type: MarketType, username: string, title: string) {
  return MOCK_ITEMS.find(
    (x) => x.type === type && x.username === username && x.title === title
  );
}
