import { clearAuthStorage, getStoredToken, isTokenExpired } from './auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function getToken() {
  const token = getStoredToken();
  if (!token) return null;

  if (isTokenExpired(token)) {
    clearAuthStorage();
    window.dispatchEvent(new CustomEvent('auth:expired'));
    return null;
  }

  return token;
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  const isFormData = options.body instanceof FormData;

  if (!isFormData) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : { message: await res.text() };

  if (res.status === 401 && path !== '/admin/login') {
    clearAuthStorage();
    window.dispatchEvent(new CustomEvent('auth:expired'));
  }

  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  post: (path, body) =>
    request(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  get: (path) => request(path, { method: 'GET' }),
  put: (path, body) =>
    request(path, { method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
