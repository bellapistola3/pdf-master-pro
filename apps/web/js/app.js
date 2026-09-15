function routeFromHash() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  if (hash === '/') return { view: 'landing' };
  if (hash === '/tools') return { view: 'tools' };
  if (hash.startsWith('/tools/')) return { view: 'tool', slug: hash.split('/')[2] };
  if (hash === '/pricing') return { view: 'pricing' };
  if (hash === '/dashboard') return { view: 'dashboard' };
  if (hash === '/login') return { view: 'login' };
  if (hash === '/register') return { view: 'register' };
  if (hash === '/terms') return { view: 'terms' };
  if (hash === '/privacy') return { view: 'privacy' };
  return { view: '404' };
}

function render() {
  const route = routeFromHash();
  const app = document.getElementById('app');
  const views = {
    landing: landingView,
    tools: toolsDirectoryView,
    tool: () => toolWorkspaceView(route.slug),
    pricing: pricingView,
    dashboard: dashboardView,
    login: loginView,
    register: registerView,
    terms: () => legalPageView('terms'),
    privacy: () => legalPageView('privacy'),
    '404': notFoundView,
  };
  app.innerHTML = (views[route.view] || notFoundView)();
  window.scrollTo(0, 0);

  // Dashboard shows plan info that can change server-side at any time (Stripe
  // webhook). Refresh from /auth/me so an upgrade/cancellation is reflected
  // without requiring the user to log out and back in.
  if (route.view === 'dashboard' && currentUser()) {
    refreshCurrentUser();
  }
}

async function refreshCurrentUser() {
  try {
    const fresh = await apiRequest('/auth/me');
    const cached = currentUser();
    if (cached && fresh.plan !== cached.plan) {
      localStorage.setItem('pmp_user', JSON.stringify({ ...cached, ...fresh }));
      if ((window.location.hash || '#/') === '#/dashboard') render();
    } else if (cached) {
      localStorage.setItem('pmp_user', JSON.stringify({ ...cached, ...fresh }));
    }
  } catch {
    // Token expired/invalid — leave cached state as-is; user will hit a 401 on their next real action.
  }
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

function renderProgress(container, job) {
  const statusLabel = { queued: t('statusQueued'), processing: t('statusProcessing'), failed: t('statusFailed'), completed: t('statusCompleted') }[job.status] || job.status;
  const pct = job.status === 'completed' ? 100 : job.status === 'processing' ? 60 : job.status === 'failed' ? 100 : 20;
  const barColor = job.status === 'failed' ? 'var(--stamp)' : 'var(--signal)';
  container.innerHTML = `
    <div class="surface rounded-2xl p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="font-medium">${statusLabel}</span>
      </div>
      <div class="progress-bar"><div style="width:${pct}%; background:${barColor}"></div></div>
      ${job.status === 'failed' ? `<p class="mt-4 text-sm" style="color: var(--stamp)">${job.errorMessage}</p>` : ''}
      ${job.status === 'completed' ? `
        <div class="mt-5 flex gap-3">
          <a href="${downloadUrlFor(job)}" class="btn-primary" download>${t('downloadBtn')}</a>
          <button onclick="render()" class="btn-secondary">${t('processAnotherBtn')}</button>
        </div>` : ''}
    </div>`;
}

function renderSyncResult(container, payload) {
  container.innerHTML = `<div class="surface rounded-2xl p-6">
    <pre class="text-sm whitespace-pre-wrap" style="font-family: 'IBM Plex Sans', sans-serif">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
  </div>`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function handleToolSubmit(e, slug) {
  e.preventDefault();
  const tool = toolBySlug(slug);
  const form = e.target;
  const resultEl = document.getElementById('tool-result');
  const submitBtn = form.querySelector('button[type=submit]');
  submitBtn.disabled = true;
  submitBtn.textContent = t('statusProcessing');

  try {
    const formData = new FormData(form);
    // Clean up empty optional fields so they don't reach the API as "".
    for (const field of tool.fields) {
      if (field.optional) {
        const v = formData.get(field.name);
        if (v === '' || v == null) formData.delete(field.name);
      }
    }

    const response = await runTool(tool.api, formData);

    if (tool.sync) {
      renderSyncResult(resultEl, response);
    } else {
      renderProgress(resultEl, { status: response.status || 'processing' });
      const finalJob = await pollJob(response.jobId, {
        onTick: (job) => renderProgress(resultEl, job),
      });
      renderProgress(resultEl, finalJob);
    }
  } catch (err) {
    resultEl.innerHTML = `<div class="surface rounded-2xl p-6" style="border-color: var(--stamp)">
      <p style="color: var(--stamp)" class="font-medium">${t('statusFailed')}</p>
      <p class="text-sm mt-2" style="color: var(--ink-soft)">${escapeHtml(err.message)}</p>
    </div>`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t('processBtn');
  }
}
