// Simple utility for auth token management
const TOKEN_KEY = 'token';

export const authUtils = {
  // Store the authentication token
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Get the stored token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Remove the stored token
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get auth header
  getAuthHeader: (): Record<string, string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};