import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE: string = (Constants.expoConfig?.extra as any)?.apiBaseUrl || 'http://localhost:4000/api';

async function authHeaders(): Promise<Record<string, string>> {
  const token = await AsyncStorage.getItem('pmp_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function anonymousHeaders(): Promise<Record<string, string>> {
  let anon = await AsyncStorage.getItem('pmp_anon_id');
  if (!anon) {
    anon = 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    await AsyncStorage.setItem('pmp_anon_id', anon);
  }
  return { 'X-Anonymous-Id': anon };
}

export async function apiRequest(path: string, opts: { method?: string; body?: any; isForm?: boolean } = {}) {
  const { method = 'GET', body, isForm = false } = opts;
  const headers: Record<string, string> = { ...(await authHeaders()), ...(await anonymousHeaders()) };
  if (!isForm && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data;
}

/** Uploads a picked document/image (from expo-document-picker / expo-image-picker) to a tool endpoint. */
export async function runTool(apiPath: string, fileUri: string, fileName: string, mimeType: string, extraFields: Record<string, string> = {}, fileFieldName = 'file') {
  const form = new FormData();
  form.append(fileFieldName, { uri: fileUri, name: fileName, type: mimeType } as any);
  for (const [k, v] of Object.entries(extraFields)) form.append(k, v);
  return apiRequest(apiPath, { method: 'POST', body: form, isForm: true });
}

export async function pollJob(jobId: string, onTick?: (job: any) => void, timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const job = await apiRequest(`/jobs/${jobId}`);
    onTick?.(job);
    if (['completed', 'failed', 'expired'].includes(job.status)) return job;
    await new Promise((r) => setTimeout(r, 1200));
  }
  throw new Error('Job polling timed out');
}

export function downloadUrlFor(job: any) {
  return job.downloadUrl ? `${API_BASE}${job.downloadUrl}` : null;
}

export async function login(email: string, password: string) {
  const data = await apiRequest('/auth/login', { method: 'POST', body: { email, password } });
  await AsyncStorage.setItem('pmp_token', data.token);
  return data;
}

export async function register(email: string, password: string) {
  const data = await apiRequest('/auth/register', { method: 'POST', body: { email, password } });
  await AsyncStorage.setItem('pmp_token', data.token);
  return data;
}
