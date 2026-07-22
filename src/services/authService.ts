const ADMIN_PASSWORD_HASH = 'admin123';
const AUTH_KEY = 'auto_bellini_admin_session';

export const authService = {
  login(password: string): boolean {
    if (password === ADMIN_PASSWORD_HASH) {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, loginTime: Date.now() }));
      return true;
    }
    return false;
  },

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    const session = sessionStorage.getItem(AUTH_KEY);
    if (!session) return false;
    try {
      const data = JSON.parse(session);
      return !!data.isAuthenticated;
    } catch {
      return false;
    }
  }
};
