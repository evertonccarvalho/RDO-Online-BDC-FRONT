import api from "./api";

export abstract class TokenService {
  private static key = "token";

  static save = (token: string) => {
    localStorage.setItem(this.key, token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  static get = (): string | null => {
    // Verifica se o localStorage está disponível
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(this.key);
    }
    return null;
  };

  static remove = () => {
    // Verifica se o localStorage está disponível
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(this.key);
    }
  };
}
