'use client';

import { BROWSER_API_URL } from './api';

const tokenKey = 'portfolio_access_token';
export const getToken = () => typeof window === 'undefined' ? null : localStorage.getItem(tokenKey);
export const setToken = (value: string) => localStorage.setItem(tokenKey, value);
export const clearToken = () => localStorage.removeItem(tokenKey);

export async function adminFetch(path: string, init: RequestInit = {}) {
  const call = (token: string | null) => fetch(`${BROWSER_API_URL}${path}`, { ...init, credentials: 'include', headers: { ...(!(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), ...init.headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  let response = await call(getToken());
  if (response.status === 401 && getToken()) {
    const refresh = await fetch(`${BROWSER_API_URL}/api/auth/refresh`, { method: 'POST', credentials: 'include' });
    if (refresh.ok) { const data = await refresh.json(); setToken(data.accessToken); response = await call(data.accessToken); }
    else clearToken();
  }
  return response;
}
