const TOKEN_KEY = 'token';
const ADMIN_KEY = 'admin';

function parseJson(rawValue) {
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function decodeJwt(token) {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=');
    return parseJson(window.atob(padded));
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdmin() {
  return parseJson(localStorage.getItem(ADMIN_KEY));
}

export function isTokenExpired(token, clockSkewSeconds = 10) {
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now + clockSkewSeconds;
}

export function hasActiveSession() {
  const token = getStoredToken();
  if (!token) return false;

  const expired = isTokenExpired(token);
  if (expired) {
    clearAuthStorage();
    return false;
  }

  return true;
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getAdminUsername() {
  const admin = getStoredAdmin();
  if (!admin) return 'Admin';
  return admin.username || admin.fullname || 'Admin';
}
