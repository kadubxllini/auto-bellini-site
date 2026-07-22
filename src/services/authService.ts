const DEFAULT_ADMIN_PASSWORD = 'admin';
const AUTH_KEY = 'auto_bellini_admin_session';
const CUSTOM_PASSWORD_KEY = 'auto_bellini_admin_password';

export const authService = {
  getAdminPassword(): string {
    return localStorage.getItem(CUSTOM_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  },

  setAdminPassword(newPassword: string): void {
    if (newPassword && newPassword.trim()) {
      localStorage.setItem(CUSTOM_PASSWORD_KEY, newPassword.trim());
    }
  },

  login(password: string): boolean {
    const currentPassword = this.getAdminPassword();
    if (password === currentPassword) {
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

