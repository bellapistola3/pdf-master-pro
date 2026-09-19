function iconFor(categoryId) {
  const icons = {
    organize: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h10M4 17h13" stroke-linecap="round"/></svg>',
    optimize: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v6m0 6v6M3 12h6m6 0h6" stroke-linecap="round"/></svg>',
    'convert-to': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h16m0 0l-5-5m5 5l-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'convert-from': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 12H4m0 0l5-5m-5 5l5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke-linejoin="round"/></svg>',
    security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3z" stroke-linejoin="round"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v3m0 12v3M4.2 4.2l2.1 2.1m11.4 11.4l2.1 2.1M3 12h3m12 0h3M4.2 19.8l2.1-2.1m11.4-11.4l2.1-2.1" stroke-linecap="round"/><circle cx="12" cy="12" r="3.2"/></svg>',
  };
  return icons[categoryId] || icons.organize;
}

function catName(id) {
  const c = TOOL_CATEGORIES.find((c) => c.id === id);
  return c ? c[state.lang] : id;
}

function navBar(active) {
  const links = [
    ['#/', state.lang === 'bg' ? 'Начало' : 'Home'],
    ['#/tools', state.lang === 'bg' ? 'Инструменти' : 'Tools'],
    ['#/pricing', state.lang === 'bg' ? 'Цени' : 'Pricing'],
    ['#/dashboard', state.lang === 'bg' ? 'Табло' : 'Dashboard'],
  ];
  const user = currentUser();
  return `
  <header class="sticky top-0 z-30 backdrop-blur bg-[var(--paper)]/90 border-b" style="border-color: var(--line)">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#/" class="font-display text-xl font-semibold flex items-center gap-2">
        <span style="color: var(--stamp)">●</span> PDF Master Pro
      </a>
      <nav class="hidden md:flex items-center gap-7 text-sm">
        ${links.map(([href, label]) => `<a href="${href}" class="nav-link" ${active === href ? 'aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
      <div class="flex items-center gap-3">
        <button onclick="setLang(state.lang === 'bg' ? 'en' : 'bg')" class="chip" aria-label="Switch language">${state.lang === 'bg' ? 'EN' : 'BG'}</button>
        ${user
          ? `<button onclick="logout(); render()" class="btn-secondary text-sm !py-2 !px-4">${state.lang === 'bg' ? 'Изход' : 'Log out'}</button>`
          : `<a href="#/login" class="btn-secondary text-sm !py-2 !px-4">${state.lang === 'bg' ? 'Вход' : 'Log in'}</a>`}
      </div>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="border-t mt-24" style="border-color: var(--line)">
    <div class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm" style="color: var(--ink-soft)">
      <div>
        <div class="font-display text-lg font-semibold mb-2" style="color: var(--ink)">PDF Master Pro</div>
        <p>${t('privacyNotice')}</p>
      </div>
      <div>
        <div class="font-semibold mb-2" style="color: var(--ink)">${state.lang === 'bg' ? 'Продукт' : 'Product'}</div>
        <a href="#/tools" class="block mb-1">${state.lang === 'bg' ? 'Инструменти' : 'Tools'}</a>
        <a href="#/pricing" class="block mb-1">${state.lang === 'bg' ? 'Цени' : 'Pricing'}</a>
      </div>
      <div>
        <div class="font-semibold mb-2" style="color: var(--ink)">${state.lang === 'bg' ? 'Компания' : 'Company'}</div>
        <a href="#/terms" class="block mb-1">${t('termsTitle')}</a>
        <a href="#/privacy" class="block mb-1">${t('privacyTitle')}</a>
        <span class="block mb-1">© ${new Date().getFullYear()} PDF Master Pro</span>
      </div>
    </div>
  </footer>`;
}

function heroIllustration() {
  return `
  <svg viewBox="0 0 360 320" class="w-full h-auto max-w-md" role="img" aria-label="Organized stack of documents">
    <rect x="60" y="150" width="180" height="140" rx="14" fill="#fff" stroke="var(--line)" stroke-width="2" transform="rotate(-6 150 220)"/>
    <rect x="90" y="120" width="180" height="140" rx="14" fill="#fff" stroke="var(--line)" stroke-width="2" transform="rotate(3 180 190)"/>
    <rect x="80" y="80" width="190" height="150" rx="14" fill="var(--paper-raised)" stroke="var(--ink)" stroke-width="2.5"/>
    <line x1="105" y1="112" x2="230" y2="112" stroke="var(--ink-soft)" stroke-width="3" stroke-linecap="round"/>
    <line x1="105" y1="134" x2="245" y2="134" stroke="var(--line)" stroke-width="3" stroke-linecap="round"/>
    <line x1="105" y1="152" x2="245" y2="152" stroke="var(--line)" stroke-width="3" stroke-linecap="round"/>
    <line x1="105" y1="170" x2="200" y2="170" stroke="var(--line)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="255" cy="205" r="34" fill="var(--stamp)"/>
    <path d="M240 205l10 10 20-22" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function landingView() {
  const featured = TOOLS.filter((t) => t.featured).slice(0, 6);
  return `
  ${navBar('#/')}
  <main>
    <section class="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="font-display text-5xl md:text-6xl font-semibold leading-[1.05] mb-6">${t('heroTitle')}</h1>
        <p class="text-lg mb-8 max-w-md" style="color: var(--ink-soft)">${t('heroSubtitle')}</p>
        <div class="flex flex-wrap gap-4">
          <a href="#/tools" class="btn-primary">${t('ctaStart')}</a>
          <a href="#/tools" class="btn-secondary">${t('ctaAllTools')}</a>
        </div>
      </div>
      <div class="flex justify-center md:justify-end">${heroIllustration()}</div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <h2 class="font-display text-3xl font-semibold mb-8">${state.lang === 'bg' ? 'Най-търсени инструменти' : 'Most popular tools'}</h2>
      <div class="grid md:grid-cols-3 gap-5">
        ${featured.map((tool, i) => toolCardHtml(tool, i === 0)).join('')}
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <h2 class="font-display text-3xl font-semibold mb-8">${t('whyTitle')}</h2>
      <div class="grid md:grid-cols-3 gap-6">
        ${[['why1Title', 'why1Body'], ['why2Title', 'why2Body'], ['why3Title', 'why3Body']].map(([tt, bb]) => `
          <div class="surface rounded-2xl p-6">
            <h3 class="font-semibold text-lg mb-2">${t(tt)}</h3>
            <p style="color: var(--ink-soft)">${t(bb)}</p>
          </div>`).join('')}
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-24">
      <div class="surface rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="font-display text-2xl font-semibold mb-2">${state.lang === 'bg' ? 'Сигурна обработка на файлове' : 'Secure file processing'}</h2>
          <p style="color: var(--ink-soft)">${t('privacyNotice')}</p>
        </div>
        <a href="#/pricing" class="btn-primary whitespace-nowrap">${state.lang === 'bg' ? 'Виж плановете' : 'See plans'}</a>
      </div>
    </section>
  </main>
  ${footer()}`;
}

function toolCardHtml(tool, big = false) {
  const badge = tool.roadmap ? `<span class="chip" style="border-color: var(--stamp); color: var(--stamp)">${state.lang === 'bg' ? 'Скоро' : 'Roadmap'}</span>` : '';
  return `
  <a href="#/tools/${tool.slug}" class="tool-card surface p-6 flex flex-col gap-4 ${big ? 'featured md:col-span-1' : ''}" tabindex="0">
    <div class="w-10 h-10" style="color: var(--signal)">${iconFor(tool.category)}</div>
    <div>
      <div class="flex items-center gap-2 mb-1">
        <h3 class="font-semibold text-lg">${tool[state.lang]}</h3>
        ${badge}
      </div>
      <p class="text-sm" style="color: var(--ink-soft)">${tool[state.lang + 'Desc']}</p>
    </div>
  </a>`;
}

function toolsDirectoryView() {
  const grouped = TOOL_CATEGORIES.map((cat) => ({
    cat,
    tools: TOOLS.filter((t) => t.category === cat.id),
  }));
  return `
  ${navBar('#/tools')}
  <main class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="font-display text-4xl font-semibold mb-4">${t('toolsDirTitle')}</h1>
    <input id="tool-search" type="search" placeholder="${t('searchPlaceholder')}"
      class="w-full max-w-md rounded-full px-5 py-3 mb-12 surface"
      oninput="filterTools(this.value)">
    <div id="tool-groups">
      ${grouped.map(({ cat, tools }) => `
        <div class="tool-group mb-12" data-cat="${cat.id}">
          <h2 class="font-display text-2xl font-semibold mb-5">${cat[state.lang]}</h2>
          <div class="grid md:grid-cols-3 gap-5">
            ${tools.map((tool) => toolCardHtml(tool)).join('')}
          </div>
        </div>`).join('')}
    </div>
  </main>
  ${footer()}`;
}

function filterTools(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.tool-group').forEach((group) => {
    let anyVisible = false;
    group.querySelectorAll('.tool-card').forEach((card) => {
      const match = card.textContent.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
      if (match) anyVisible = true;
    });
    group.style.display = anyVisible ? '' : 'none';
  });
}

function fieldHtml(field) {
  const id = `field-${field.name}`;
  if (field.type === 'file') {
    return `<div class="mb-5">
      <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
      <input id="${id}" name="${field.name}" type="file" accept=".pdf,application/pdf,image/*" required class="block w-full text-sm surface rounded-xl p-3">
    </div>`;
  }
  if (field.type === 'files') {
    return `<div class="mb-5">
      <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
      <input id="${id}" name="${field.name}" type="file" accept=".pdf,application/pdf" multiple required class="block w-full text-sm surface rounded-xl p-3">
      <p class="text-xs mt-1" style="color: var(--ink-soft)">${state.lang === 'bg' ? 'Избери 2 или повече файла.' : 'Select 2 or more files.'}</p>
    </div>`;
  }
  if (field.type === 'images') {
    return `<div class="mb-5">
      <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
      <input id="${id}" name="${field.name}" type="file" accept="image/*" multiple required class="block w-full text-sm surface rounded-xl p-3">
    </div>`;
  }
  if (field.type === 'select') {
    return `<div class="mb-5">
      <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
      <select id="${id}" name="${field.name}" class="w-full surface rounded-xl p-3 text-sm">
        ${field.options.map(([v, l]) => `<option value="${v}" ${v === field.default ? 'selected' : ''}>${l}</option>`).join('')}
      </select>
    </div>`;
  }
  if (field.type === 'password') {
    return `<div class="mb-5">
      <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
      <input id="${id}" name="${field.name}" type="password" ${field.optional ? '' : 'required'} class="w-full surface rounded-xl p-3 text-sm">
    </div>`;
  }
  if (field.type === 'number') {
    return `<div class="mb-5">
      <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
      <input id="${id}" name="${field.name}" type="number" step="${field.step || '1'}" value="${field.default ?? ''}" ${field.optional ? '' : ''} class="w-full surface rounded-xl p-3 text-sm">
    </div>`;
  }
  // text / textarea
  return `<div class="mb-5">
    <label class="block text-sm font-medium mb-2" for="${id}">${field.label}</label>
    <input id="${id}" name="${field.name}" type="text" ${field.optional ? '' : 'required'} class="w-full surface rounded-xl p-3 text-sm">
  </div>`;
}

function toolWorkspaceView(slug) {
  const tool = toolBySlug(slug);
  if (!tool) return notFoundView();

  if (tool.roadmap) {
    return `
    ${navBar('#/tools')}
    <main class="max-w-2xl mx-auto px-6 py-20 text-center">
      <div class="chip inline-block mb-6" style="border-color: var(--stamp); color: var(--stamp)">${state.lang === 'bg' ? 'В roadmap' : 'On the roadmap'}</div>
      <h1 class="font-display text-3xl font-semibold mb-4">${tool[state.lang]}</h1>
      <p style="color: var(--ink-soft)" class="mb-8">${state.lang === 'bg'
        ? 'Този инструмент изисква допълнителна backend услуга (LibreOffice/Chromium), която не е активирана в текущия MVP build. Виж README за инструкции как да я включиш.'
        : 'This tool needs an additional backend service (LibreOffice/Chromium) not enabled in the current MVP build. See the README for how to turn it on.'}</p>
      <a href="#/tools" class="btn-secondary">${state.lang === 'bg' ? 'Обратно към инструментите' : 'Back to tools'}</a>
    </main>
    ${footer()}`;
  }

  return `
  ${navBar('#/tools')}
  <main class="max-w-2xl mx-auto px-6 py-16">
    <a href="#/tools" class="text-sm mb-6 inline-block" style="color: var(--signal)">&larr; ${state.lang === 'bg' ? 'Всички инструменти' : 'All tools'}</a>
    <h1 class="font-display text-4xl font-semibold mb-3">${tool[state.lang]}</h1>
    <p class="mb-10" style="color: var(--ink-soft)">${tool[state.lang + 'Desc']}</p>

    ${tool.needsLlm ? `<div class="chip mb-6" style="border-color: var(--sage); color: var(--sage)">${state.lang === 'bg' ? 'Изисква конфигуриран AI доставчик (LLM_PROVIDER)' : 'Requires a configured AI provider (LLM_PROVIDER)'}</div>` : ''}

    <form id="tool-form" class="surface rounded-2xl p-6 md:p-8" onsubmit="handleToolSubmit(event, '${tool.slug}')">
      ${tool.fields.map(fieldHtml).join('')}
      <button type="submit" class="btn-primary w-full justify-center mt-2">${t('processBtn')}</button>
    </form>

    <div id="tool-result" class="mt-8"></div>
  </main>
  ${footer()}`;
}

function notFoundView() {
  return `${navBar()}
  <main class="max-w-2xl mx-auto px-6 py-24 text-center">
    <h1 class="font-display text-4xl font-semibold mb-4">404</h1>
    <a href="#/" class="btn-secondary">${state.lang === 'bg' ? 'Начало' : 'Home'}</a>
  </main>${footer()}`;
}

function pricingView() {
  const plans = [
    {
      id: 'free', name: 'Free', price: '0 лв.',
      features: state.lang === 'bg'
        ? ['5 операции на ден', 'До 25 MB на файл', 'Основни инструменти']
        : ['5 operations / day', 'Up to 25MB per file', 'Basic tools'],
    },
    {
      id: 'pro', name: 'Pro', price: state.lang === 'bg' ? '19.99 лв./мес' : '$9.99/mo', highlighted: true,
      features: state.lang === 'bg'
        ? ['500 операции / месец', 'До 500 MB на файл', 'OCR и batch обработка', 'PDF в Word/Excel', 'AI резюме']
        : ['500 operations / month', 'Up to 500MB per file', 'OCR & batch processing', 'PDF to Word/Excel', 'AI summary'],
    },
    {
      id: 'business', name: 'Business', price: state.lang === 'bg' ? 'По договаряне' : 'Custom',
      features: state.lang === 'bg'
        ? ['Екипна употреба', 'API достъп', 'Приоритетна обработка', 'По-високи лимити']
        : ['Team usage', 'API access', 'Priority processing', 'Higher limits'],
    },
  ];
  return `
  ${navBar('#/pricing')}
  <main class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="font-display text-4xl font-semibold mb-12 text-center">${t('pricingTitle')}</h1>
    <div class="grid md:grid-cols-3 gap-6 items-start">
      ${plans.map((p) => `
        <div class="surface rounded-3xl p-8 ${p.highlighted ? 'ring-2' : ''}" ${p.highlighted ? 'style="--tw-ring-color: var(--stamp)"' : ''}>
          <h2 class="font-display text-2xl font-semibold mb-1">${p.name}</h2>
          <p class="text-3xl font-semibold mb-6">${p.price}</p>
          <ul class="space-y-3 mb-8 text-sm">
            ${p.features.map((f) => `<li class="flex gap-2"><span style="color: var(--signal)">✓</span>${f}</li>`).join('')}
          </ul>
          <button onclick="startCheckout('${p.id}')" class="btn-${p.highlighted ? 'primary' : 'secondary'} w-full justify-center">
            ${p.id === 'free' ? (state.lang === 'bg' ? 'Текущ план' : 'Current plan') : (state.lang === 'bg' ? 'Избери план' : 'Choose plan')}
          </button>
        </div>`).join('')}
    </div>
  </main>
  ${footer()}`;
}

async function startCheckout(planId) {
  if (planId === 'free') return;
  if (!currentUser()) { window.location.hash = '#/login'; return; }
  if (currentUser().plan !== 'free') { openBillingPortal(); return; }
  try {
    const data = await apiRequest('/billing/create-checkout-session', { method: 'POST', body: { plan: planId } });
    window.location.href = data.checkoutUrl;
  } catch (err) {
    alert(err.message);
  }
}

function loginView() {
  return `
  ${navBar()}
  <main class="max-w-md mx-auto px-6 py-20">
    <h1 class="font-display text-3xl font-semibold mb-8">${state.lang === 'bg' ? 'Вход' : 'Log in'}</h1>
    <form class="surface rounded-2xl p-8" onsubmit="handleLogin(event)">
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2">Email</label>
        <input name="email" type="email" required class="w-full surface rounded-xl p-3 text-sm">
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">${state.lang === 'bg' ? 'Парола' : 'Password'}</label>
        <input name="password" type="password" required class="w-full surface rounded-xl p-3 text-sm">
      </div>
      <button class="btn-primary w-full justify-center">${state.lang === 'bg' ? 'Влез' : 'Log in'}</button>
      <p class="text-sm mt-4 text-center">
        ${state.lang === 'bg' ? 'Нямаш акаунт?' : "Don't have an account?"}
        <a href="#/register" style="color: var(--signal)">${state.lang === 'bg' ? 'Регистрирай се' : 'Register'}</a>
      </p>
    </form>
  </main>
  ${footer()}`;
}

function registerView() {
  return `
  ${navBar()}
  <main class="max-w-md mx-auto px-6 py-20">
    <h1 class="font-display text-3xl font-semibold mb-8">${state.lang === 'bg' ? 'Регистрация' : 'Register'}</h1>
    <form class="surface rounded-2xl p-8" onsubmit="handleRegister(event)">
      <div class="mb-5">
        <label class="block text-sm font-medium mb-2">Email</label>
        <input name="email" type="email" required class="w-full surface rounded-xl p-3 text-sm">
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">${state.lang === 'bg' ? 'Парола (мин. 8 символа)' : 'Password (min 8 chars)'}</label>
        <input name="password" type="password" minlength="8" required class="w-full surface rounded-xl p-3 text-sm">
      </div>
      <button class="btn-primary w-full justify-center">${state.lang === 'bg' ? 'Създай акаунт' : 'Create account'}</button>
    </form>
  </main>
  ${footer()}`;
}

async function handleLogin(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await login(fd.get('email'), fd.get('password'));
    window.location.hash = '#/dashboard';
  } catch (err) {
    alert(err.message);
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await register(fd.get('email'), fd.get('password'));
    window.location.hash = '#/dashboard';
  } catch (err) {
    alert(err.message);
  }
}

function simpleMarkdown(md) {
  // Minimal renderer: **bold**, blank-line paragraphs, horizontal rules. Good enough for legal text.
  return md
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      if (block.trim() === '---') return '<hr class="my-8" style="border-color: var(--line)">';
      const withBold = escapeHtml(block).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return `<p class="mb-4 leading-relaxed">${withBold.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

function legalPageView(kind) {
  const title = kind === 'terms' ? t('termsTitle') : t('privacyTitle');
  const content = LEGAL[state.lang][kind];
  return `
  ${navBar()}
  <main class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="font-display text-4xl font-semibold mb-10">${title}</h1>
    <div class="surface rounded-2xl p-8 text-sm" style="color: var(--ink-soft)">
      ${simpleMarkdown(content)}
    </div>
  </main>
  ${footer()}`;
}

function dashboardView() {
  const user = currentUser();
  return `
  ${navBar('#/dashboard')}
  <main class="max-w-4xl mx-auto px-6 py-16">
    <h1 class="font-display text-4xl font-semibold mb-2">${t('dashTitle')}</h1>
    <p style="color: var(--ink-soft)" class="mb-8">
      ${user ? `${user.email}` : (state.lang === 'bg' ? 'Работиш анонимно — влез, за да пазиш история между устройства.' : 'Working anonymously — log in to keep history across devices.')}
    </p>

    ${user ? `
    <div class="surface rounded-2xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="chip inline-block mb-2" style="border-color: var(--signal); color: var(--signal)">${user.plan.toUpperCase()}</div>
        <p class="text-sm" style="color: var(--ink-soft)">
          ${user.plan === 'free'
            ? (state.lang === 'bg' ? 'Ъпгрейдни за по-високи лимити и повече функции.' : 'Upgrade for higher limits and more features.')
            : (state.lang === 'bg' ? 'Управлявай плана и фактурите си през Stripe.' : 'Manage your plan and invoices via Stripe.')}
        </p>
      </div>
      <div class="flex gap-3">
        ${user.plan === 'free'
          ? `<a href="#/pricing" class="btn-primary">${state.lang === 'bg' ? 'Ъпгрейд' : 'Upgrade'}</a>`
          : `<button onclick="openBillingPortal()" class="btn-secondary">${state.lang === 'bg' ? 'Управление на плащанията' : 'Manage billing'}</button>`}
      </div>
    </div>` : ''}

    <div class="surface rounded-2xl p-6">
      <h2 class="font-semibold mb-4">${state.lang === 'bg' ? 'Последни операции' : 'Recent operations'}</h2>
      <div id="recent-jobs" class="text-sm" style="color: var(--ink-soft)">${state.lang === 'bg' ? 'Обработи файл, за да видиш история тук.' : 'Process a file to see history here.'}</div>
    </div>
  </main>
  ${footer()}`;
}

async function openBillingPortal() {
  try {
    const data = await apiRequest('/billing/create-portal-session', { method: 'POST', body: {} });
    window.location.href = data.portalUrl;
  } catch (err) {
    alert(err.message);
  }
}
