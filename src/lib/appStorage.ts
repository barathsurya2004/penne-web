import type { Budget, Txn, User } from '../types';

const KEY = 'easypay.app.v1';

export interface PersistedApp {
  isAuthenticated: boolean;
  user: User;
  balance: number;
  budgets: Budget[];
  txns: Txn[];
}

export function loadPersistedApp(): PersistedApp | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.isAuthenticated) return null;
    return parsed as PersistedApp;
  } catch {
    return null;
  }
}

export function savePersistedApp(data: PersistedApp) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage unavailable (private mode etc.) — state simply won't persist across reloads
  }
}

export function clearPersistedApp() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
