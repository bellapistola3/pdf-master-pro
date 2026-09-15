const API_BASE = window.PDF_MASTER_API_BASE || 'http://localhost:4000/api';

function authHeaders() {
  const token = localStorage.getItem('pmp_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function anonymousHeaders() {
  let anon = localStorage.getItem('pmp_anon_id');
  if (!anon) {
    anon = 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('pmp_anon_id', anon);
  }
  return { 'X-Anonymous-Id': anon };
}

async function apiRequest(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = { ...authHeaders(), ...anonymousHeaders() };
  if (!isForm && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function runTool(apiPath, formData) {
  return apiRequest(apiPath, { method: 'POST', body: formData, isForm: true });
}

async function pollJob(jobId, { onTick, intervalMs = 1200, timeoutMs = 120000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const job = await apiRequest(`/jobs/${jobId}`);
    onTick?.(job);
    if (job.status === 'completed' || job.status === 'failed' || job.status === 'expired') {
      return job;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error('Job polling timed out');
}

function downloadUrlFor(job) {
  return job.downloadUrl ? `${API_BASE}${job.downloadUrl}` : null;
}

async function login(email, password) {
  const data = await apiRequest('/auth/login', { method: 'POST', body: { email, password } });
  localStorage.setItem('pmp_token', data.token);
  localStorage.setItem('pmp_user', JSON.stringify(data.user));
  return data;
}

async function register(email, password) {
  const data = await apiRequest('/auth/register', { method: 'POST', body: { email, password } });
  localStorage.setItem('pmp_token', data.token);
  localStorage.setItem('pmp_user', JSON.stringify(data.user));
  return data;
}

function logout() {
  localStorage.removeItem('pmp_token');
  localStorage.removeItem('pmp_user');
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem('pmp_user') || 'null');
  } catch {
    return null;
  }
}
