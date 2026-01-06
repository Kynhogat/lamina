// app/market/api.ts
import { API_BASE_URL, API_TIMEOUT_MS } from "./config";
import type {
  AuthResponse,
  MarketResult,
  SearchResponse,
  MarketType,
  SearchItem,
  CreateObjectInput,
  UpdateObjectInput,
} from "./types";
import { authStore } from "./authStore";
import { mockSearch, mockGetOne } from "./mock";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function routeForType(t: MarketType) {
  // IMPORTANT: This is the ONLY place you change if your backend route differs.
  if (t === "node-c") return "/nodes-custom";
  if (t === "node-g") return "/nodes-grouped";
  return "/workflow-templates";
}

async function fetchText(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: any;
    auth?: boolean;
    timeoutMs?: number;
    retryOn401?: boolean;
    headers?: Record<string, string>;
  } = {}
): Promise<Response> {
  const method = opts.method ?? "GET";
  const timeoutMs = opts.timeoutMs ?? API_TIMEOUT_MS;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers: Record<string, string> = {
      ...(opts.headers ?? {}),
    };

    if (opts.auth) {
      const token = authStore.accessToken;
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: opts.body,
      signal: controller.signal,
    });

    // One refresh retry
    if (res.status === 401 && opts.auth && (opts.retryOn401 ?? true)) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return fetchText(path, { ...opts, retryOn401: false });
      }
      authStore.clear();
      throw new Error("Unauthorized (refresh failed)");
    }

    return res;
  } finally {
    clearTimeout(t);
  }
}

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
  const res = await fetchText(path, {
    method: opts.method,
    auth: opts.auth,
    timeoutMs: opts.timeoutMs,
    retryOn401: opts.retryOn401,
    headers: opts.body ? { "Content-Type": "application/json" } : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${txt || res.statusText}`);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : ({} as T)) as T;
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = authStore.refreshToken;
  if (!refreshToken) return false;

  try {
    const data = await fetchJson<{ accessToken: string }>("/refreshAccessToken", {
      method: "POST",
      body: { refreshToken },
      auth: false,
      retryOn401: false,
    });

    if (data?.accessToken) {
      authStore.setTokens({ accessToken: data.accessToken });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export const marketApi = {
  // -------- AUTH --------
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

  logout() {
    authStore.clear();
  },

  // -------- MARKET SEARCH (mock fallback) --------
  async searchFiltered(params: {
    searchTerm: string;
    type?: MarketType | "";
    skip?: number;
    take?: number;
  }): Promise<MarketResult> {
    const { searchTerm, type = "", skip = 0, take = 16 } = params;

    const qp = new URLSearchParams();
    qp.set("searchTerm", searchTerm);
    if (type) qp.set("type", type);
    qp.set("skip", String(skip));

    try {
      const data = await fetchJson<SearchResponse>(`/searchFiltered?${qp.toString()}`, {
        method: "GET",
        auth: false,
      });

      return { items: (data?.objectArray ?? []).slice(0, take), usedMock: false };
    } catch (e: any) {
      return {
        items: mockSearch({ searchTerm, type, skip, take }),
        usedMock: true,
        error: e?.message || "Backend unavailable",
      };
    }
  },

  // -------- DETAILS (tries backend, falls back to mock) --------
  async getDetails(params: {
    type: MarketType;
    username: string;
    title: string;
  }): Promise<{ item: SearchItem; usedMock: boolean; error?: string }> {
    const { type, username, title } = params;

    // If your backend returns metadata separate from file, adjust this.
    // Right now we assume your search listing already provides enough for details
    // and details page can work with that + download endpoint.
    try {
      // OPTIONAL: if you have a metadata endpoint, call it here
      // For now: just confirm it exists by hitting the GET file endpoint HEAD-ish
      // (Some servers don’t support HEAD. We'll do GET and not read full body.)
      const base = routeForType(type);
      const res = await fetchText(`${base}/${type}/${encodeURIComponent(username)}/${encodeURIComponent(title)}`, {
        method: "GET",
        auth: true,
        timeoutMs: API_TIMEOUT_MS,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // We don’t know the server metadata structure, so we return a minimal item:
      // The UI will show title/user/type and rely on list data for descriptions.
      // You can enrich later if backend returns JSON.
      const fromMock = mockGetOne(type, username, title);
      if (fromMock) return { item: fromMock, usedMock: false };

      return {
        item: {
          title,
          username,
          type,
          shortDescription: "Loaded from backend.",
          longDescription: "",
        },
        usedMock: false,
      };
    } catch (e: any) {
      const m = mockGetOne(type, username, title);
      if (m) return { item: m, usedMock: true, error: e?.message || "Backend unavailable" };
      throw e;
    }
  },

  // -------- DOWNLOAD FILE (authorized) --------
  async downloadObject(params: { type: MarketType; username: string; title: string }) {
    const { type, username, title } = params;
    const base = routeForType(type);
    const path = `${base}/${type}/${encodeURIComponent(username)}/${encodeURIComponent(title)}`;

    const res = await fetchText(path, {
      method: "GET",
      auth: true,
      timeoutMs: API_TIMEOUT_MS,
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${txt || res.statusText}`);
    }

    const blob = await res.blob();
    const contentType = res.headers.get("content-type") || "";
    const dispo = res.headers.get("content-disposition") || "";

    // Best-effort filename
    const filenameFromHeader =
      dispo.match(/filename\*=UTF-8''([^;]+)/)?.[1] ||
      dispo.match(/filename="?([^"]+)"?/)?.[1];

    const extGuess =
      type === "node-c" ? ".py" : ".json";

    const filename = decodeURIComponent(
      filenameFromHeader || `${title}_${type}${extGuess}`
    );

    return { blob, filename, contentType };
  },

  // -------- CREATE (multipart/form-data) --------
  async createObject(input: CreateObjectInput) {
    const base = routeForType(input.type);

    const fd = new FormData();
    fd.append("title", input.title);
    fd.append("username", input.username);
    fd.append("shortDescription", input.shortDescription);
    fd.append("longDescription", input.longDescription);
    fd.append("node", input.file);

    const res = await fetchText(`${base}/${input.type}`, {
      method: "POST",
      auth: true,
      body: fd, // IMPORTANT: no JSON header
      timeoutMs: API_TIMEOUT_MS,
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${txt || res.statusText}`);
    }

    return true;
  },

  // -------- UPDATE (metadata + optional new file) --------
  async updateObject(input: UpdateObjectInput) {
    const base = routeForType(input.type);
    const path = `${base}/${input.type}/${encodeURIComponent(input.username)}/${encodeURIComponent(input.oldTitle)}`;

    // Your spec: PUT expects title + descriptions + optional file
    const fd = new FormData();
    fd.append("title", input.title);
    fd.append("shortDescription", input.shortDescription);
    fd.append("longDescription", input.longDescription);
    if (input.file) fd.append("node", input.file);

    const res = await fetchText(path, {
      method: "PUT",
      auth: true,
      body: fd,
      timeoutMs: API_TIMEOUT_MS,
    });

    if (!(res.status === 204 || res.ok)) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${txt || res.statusText}`);
    }

    return true;
  },

  // -------- DELETE --------
  async deleteObject(params: { type: MarketType; username: string; title: string }) {
    const base = routeForType(params.type);
    const path = `${base}/${params.type}/${encodeURIComponent(params.username)}/${encodeURIComponent(params.title)}`;

    const res = await fetchText(path, {
      method: "DELETE",
      auth: true,
      timeoutMs: API_TIMEOUT_MS,
    });

    if (!(res.status === 204 || res.ok)) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${txt || res.statusText}`);
    }

    return true;
  },
};
