// app/market/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000";

export const API_TIMEOUT_MS = 6500;

// Your backend’s “type” strings as described
export const MARKET_TYPES = [
  { label: "All", value: "" },
  { label: "Custom Nodes", value: "node-c" },
  { label: "Grouped Nodes", value: "node-g" },
  { label: "Workflow Templates", value: "wrktmp" },
] as const;
