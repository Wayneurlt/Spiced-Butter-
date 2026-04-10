import { ref } from 'vue';
import { f as useNuxtApp, e as navigateTo } from './server.mjs';
import { D as klona, L as parse, M as getRequestHeader, d as destr, N as isEqual, O as setCookie, f as getCookie, P as deleteCookie } from '../_/nitro.mjs';

function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? undefined : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2, _b;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  (_a2 = opts.filter) != null ? _a2 : opts.filter = (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== undefined) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== undefined && delay <= 0;
  const cookieValue = klona(hasExpired ? undefined : (_b = cookies[name]) != null ? _b : (_a = opts.default) == null ? undefined : _a.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== undefined) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== undefined) {
      return deleteCookie(event, name, opts);
    }
  }
}
const ADMIN_EMAIL = "spicedbutter254@gmail.com";
const ADMIN_PASSWORD = "Spicedbutter_254";
const COOKIE_KEY = "admin_session_v1";
function useAdminAuth() {
  const session = useCookie(COOKIE_KEY, {
    sameSite: "lax",
    secure: false,
    httpOnly: false,
    path: "/",
    default: () => null
  });
  function isAuthenticated() {
    return session.value === "ok";
  }
  async function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      session.value = "ok";
      return true;
    }
    return false;
  }
  function logout() {
    session.value = null;
    navigateTo("/auth/login");
  }
  return { isAuthenticated, login, logout };
}

export { useAdminAuth as u };
//# sourceMappingURL=useAdminAuth-BUCdWZ1O.mjs.map
