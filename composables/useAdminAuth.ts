import { useCookie, navigateTo } from "#app";

const ADMIN_EMAIL = "spicedbutter254@gmail.com";
const ADMIN_PASSWORD = "Spicedbutter_254";
const COOKIE_KEY = "admin_session_v1";

export function useAdminAuth() {
  const session = useCookie<string | null>(COOKIE_KEY, {
    sameSite: "lax",
    secure: false,
    httpOnly: false,
    path: "/",
    default: () => null,
  });

  function isAuthenticated() {
    return session.value === "ok";
  }

  async function login(email: string, password: string) {
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
