// app/market/authStore.ts
const ACCESS_KEY = "lamina_access_token";
const REFRESH_KEY = "lamina_refresh_token";
const DISPLAY_KEY = "lamina_displayname";
const USERNAME_KEY = "lamina_username";

function safeGet(key: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}
function safeSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}
function safeDel(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

export const authStore = {
  get accessToken() {
    return safeGet(ACCESS_KEY);
  },
  get refreshToken() {
    return safeGet(REFRESH_KEY);
  },
  get displayname() {
    return safeGet(DISPLAY_KEY);
  },
  get username() {
    return safeGet(USERNAME_KEY);
  },

  setTokens(opts: { accessToken?: string; refreshToken?: string }) {
    if (opts.accessToken) safeSet(ACCESS_KEY, opts.accessToken);
    if (opts.refreshToken) safeSet(REFRESH_KEY, opts.refreshToken);
  },

  setUser(opts: { displayname?: string; username?: string }) {
    if (opts.displayname) safeSet(DISPLAY_KEY, opts.displayname);
    if (opts.username) safeSet(USERNAME_KEY, opts.username);
  },

  clear() {
    safeDel(ACCESS_KEY);
    safeDel(REFRESH_KEY);
    safeDel(DISPLAY_KEY);
    safeDel(USERNAME_KEY);
  },
};
