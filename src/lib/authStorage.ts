import type { User } from '../types';

const KEY = 'easypay.auth.v1';

export interface PersistedAuth {
  isAuthenticated: boolean;
  user: User;
}

export function loadPersistedAuth(): PersistedAuth | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.isAuthenticated) return null;
    return parsed as PersistedAuth;
  } catch {
    return null;
  }
}

export function savePersistedAuth(data: PersistedAuth) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage unavailable (private mode etc.) — auth simply won't persist across reloads
  }
}

export function clearPersistedAuth() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
