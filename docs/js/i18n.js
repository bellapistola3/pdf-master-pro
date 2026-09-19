const I18N = {
  bg: {
    heroTitle: 'Всички PDF инструменти на едно място',
    heroSubtitle: 'Обединявай, компресирай, конвертирай, подписвай и защитавай PDF файлове — бързо, сигурно и без излишни стъпки.',
    ctaStart: 'Започни безплатно',
    ctaAllTools: 'Виж всички инструменти',
    whyTitle: 'Защо PDF Master Pro?',
    why1Title: 'Сигурна обработка',
    why1Body: 'Файловете се изтриват автоматично след обработка, освен ако не избереш да ги запазиш.',
    why2Title: 'Реални резултати',
    why2Body: 'Всеки инструмент върши истинска работа зад кулисите — не демонстрация, а работещ продукт.',
    why3Title: 'За всеки случай',
    why3Body: 'От бърза обработка на един файл до batch операции за екипи — планове за всеки обем работа.',
    privacyNotice: 'Файловете се изтриват автоматично след обработка, освен ако изрично не изберете да ги запазите.',
    toolsDirTitle: 'Всички инструменти',
    searchPlaceholder: 'Търси инструмент…',
    pricingTitle: 'Планове за всеки обем работа',
    dashTitle: 'Табло',
    termsTitle: 'Общи условия',
    privacyTitle: 'Политика за поверителност',
    uploadCta: 'Провлачи файлове тук или избери от компютъра',
    processBtn: 'Обработи',
    processAnotherBtn: 'Обработи друг файл',
    downloadBtn: 'Изтегли резултата',
    statusQueued: 'В опашка…',
    statusProcessing: 'Обработва се…',
    statusFailed: 'Възникна грешка',
    statusCompleted: 'Готово',
  },
  en: {
    heroTitle: 'All your PDF tools in one workspace',
    heroSubtitle: 'Merge, compress, convert, sign, and secure PDF files — fast, private, and without extra steps.',
    ctaStart: 'Start for free',
    ctaAllTools: 'View all tools',
    whyTitle: 'Why PDF Master Pro?',
    why1Title: 'Secure processing',
    why1Body: 'Files are automatically deleted after processing unless you choose to save them.',
    why2Title: 'Real results',
    why2Body: 'Every tool does real work behind the scenes — not a demo, a working product.',
    why3Title: 'For every workload',
    why3Body: 'From a quick single-file fix to team batch operations — plans for every scale.',
    privacyNotice: 'Files are automatically deleted after processing unless you choose to save them.',
    toolsDirTitle: 'All tools',
    searchPlaceholder: 'Search tools…',
    pricingTitle: 'Plans for every workload',
    dashTitle: 'Dashboard',
    termsTitle: 'Terms of Service',
    privacyTitle: 'Privacy Policy',
    uploadCta: 'Drag files here or choose from your computer',
    processBtn: 'Process',
    processAnotherBtn: 'Process another file',
    downloadBtn: 'Download result',
    statusQueued: 'Queued…',
    statusProcessing: 'Processing…',
    statusFailed: 'Something went wrong',
    statusCompleted: 'Done',
  },
};

const state = {
  lang: localStorage.getItem('pmp_lang') || 'bg',
};

function t(key) {
  return I18N[state.lang][key] ?? I18N.en[key] ?? key;
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('pmp_lang', lang);
  render();
}
