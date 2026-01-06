// app/market/api.ts
import { API_BASE_URL, API_TIMEOUT_MS } from "./config";
import type { AuthResponse, MarketResult, SearchResponse, MarketType } from "./types";
import { authStore } from "./authStore";
import { mockSearch } from "./mock";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function fetchJson<T>(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: any;
    auth?: boolean;
    timeoutMs?: number;
    retryOn401?: boolean;
  } = {}
): Promise<T> {
  const method = opts.method ?? "GET";
  const timeoutMs = opts.timeoutMs ?? API_TIMEOUT_MS;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (opts.auth) {
      const token = authStore.accessToken;
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });

    // If access token expired, try refresh once
    if (res.status === 401 && opts.auth && (opts.retryOn401 ?? true)) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return fetchJson<T>(path, { ...opts, retryOn401: false });
      }
      authStore.clear();
      throw new Error("Unauthorized (refresh failed)");
    }

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${txt || res.statusText}`);
    }

    // Some endpoints might return empty (204). Guard:
    const text = await res.text();
    return (text ? JSON.parse(text) : ({} as T)) as T;
  } finally {
    clearTimeout(t);
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = authStore.refreshToken;
  if (!refreshToken) return false;

  // Your spec allows POST/GET, token in URI or body.
  // We'll do POST with body for cleanliness.
  try {
    const res = await fetchJson<{ accessToken: string }>("/refreshAccessToken", {
      method: "POST",
      body: { refreshToken },
      auth: false,
      timeoutMs: API_TIMEOUT_MS,
      retryOn401: false,
    });

    if (res?.accessToken) {
      authStore.setTokens({ accessToken: res.accessToken });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export const marketApi = {
  async login(username: string, password: string) {
    const data = await fetchJson<AuthResponse>("/login", {
      method: "POST",
      body: { username, password },
      auth: false,
    });

    authStore.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    authStore.setUser({ displayname: data.displayname, username });

    return data;
  },

  async register(username: string, password: string, displayname: string) {
    const data = await fetchJson<AuthResponse>("/registration", {
      method: "POST",
      body: { username, password, displayname },
      auth: false,
    });

    authStore.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    authStore.setUser({ displayname: data.displayname, username });

    return data;
  },

  async searchFiltered(params: {
    searchTerm: string;
    type?: MarketType | "";
    skip?: number;
    take?: number; // frontend-only; your backend uses skip; take can be implicit
  }): Promise<MarketResult> {
    const { searchTerm, type = "", skip = 0, take = 16 } = params;

    // Your endpoint: searchFiltered?{searchTerm}?{type}?{skip}
    const qp = new URLSearchParams();
    qp.set("searchTerm", searchTerm);
    if (type) qp.set("type", type);
    qp.set("skip", String(skip));

    try {
      const data = await fetchJson<SearchResponse>(`/searchFiltered?${qp.toString()}`, {
        method: "GET",
        auth: false, // search is not stated as authorized; keep false unless you enforce auth
      });

      return {
        items: (data?.objectArray ?? []).slice(0, take),
        usedMock: false,
      };
    } catch (e: any) {
      // HARD REQUIREMENT: backend fails -> load mock data
      return {
        items: mockSearch({ searchTerm, type, skip, take }),
        usedMock: true,
        error: e?.message || "Backend unavailable",
      };
    }
  },
};
