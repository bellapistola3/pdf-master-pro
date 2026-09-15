# Безплатен deploy — стъпка по стъпка

Тази инструкция качва цялото приложение онлайн, безплатно, без домейн и без
кредитна карта. В края ще имаш два работещи адреса:
`https://pdf-master-pro-api-XXXX.onrender.com` (backend) и
`https://pdf-master-pro-XXXX.vercel.app` (сайтът, който хората отварят).

> ⚠️ **Важно за безплатния план:** Render Free tier НЕ поддържа постоянен
> диск. Това означава, че регистрираните акаунти и файловете могат да
> изчезнат при redeploy/рестарт. Идеално е, за да пуснеш и тестваш всичко
> безплатно — но преди да приемаш истински плащания от клиенти, виж
> "Стъпка 6" по-долу (upgrade до платен план, ~$7/месец).

---

## Стъпка 1 — качи кода в GitHub (безплатно)

1. Иди на [github.com](https://github.com) → **Sign up** (ако нямаш акаунт).
2. Горе вдясно → **+** → **New repository**.
   - Repository name: `pdf-master-pro`
   - Остави го **Public** (по-лесно за безплатните планове на Render/Vercel)
   - НЕ отбелязвай "Add a README" (ще качим готовия проект)
   - **Create repository**
3. На следващата страница ще видиш линк **"uploading an existing file"**
   (или бутон **Add file → Upload files**). Кликни го.
4. Разархивирай `pdf-master-pro.zip` на компютъра си, отвори папката
   `pdf-master-pro`, маркирай **всичко вътре** и го провлачи (drag & drop)
   в browser прозореца на GitHub.
   - Ако browser-ът откаже да качи всичко наведнъж, качвай по папки
     (`apps/api`, после `apps/web`, после `apps/mobile`, после останалите
     файлове в root) — GitHub го приема на части.
5. Долу → **Commit changes**.

Готово — кодът ти вече е в GitHub на адрес
`https://github.com/ТВОЯ-ПОТРЕБИТЕЛ/pdf-master-pro`.

---

## Стъпка 2 — deploy на backend-а (API) в Render

1. Иди на [render.com](https://render.com) → **Get Started** → регистрирай
   се (най-лесно: "Sign up with GitHub", за да се свърже директно).
2. Горе вдясно → **New +** → **Blueprint**.
3. Избери repository-то `pdf-master-pro`, което качи в Стъпка 1.
4. Render автоматично ще открие файла `render.yaml` в проекта (той вече е
   настроен за безплатния план — без нужда от допълнителни промени).
5. Render ще покаже плана за услугата (`pdf-master-pro-api`, Free план).
   Натисни **Apply** / **Create New Resources**.
6. Изчакай build-а (5-10 минути — инсталира Ghostscript, qpdf, Poppler,
   Tesseract и компилира кода). Ще видиш логове на живо.
7. Когато стане "Live", копирай URL-а горе (нещо като
   `https://pdf-master-pro-api-xxxx.onrender.com`).
8. Тествай: отвори `https://ТВОЯ-АДРЕС.onrender.com/api/health` в browser
   → трябва да видиш `{"status":"ok",...}`.

---

## Стъпка 3 — deploy на сайта (web) във Vercel

1. Иди на [vercel.com](https://vercel.com) → **Sign Up** → "Continue with
   GitHub" (за да се свърже директно).
2. **Add New** → **Project**.
3. Избери същото repository `pdf-master-pro`.
4. При настройките на проекта:
   - **Root Directory** → натисни "Edit" → избери `apps/web`
   - Framework Preset → "Other" (не е нужен build command)
5. **Deploy**. След 1-2 минути ще имаш адрес като
   `https://pdf-master-pro-xxxx.vercel.app`.

---

## Стъпка 4 — свържи двете (сайтът да говори с API-то)

Сайтът все още сочи към `localhost` по подразбиране — трябва да го
пренасочим към истинския Render адрес от Стъпка 2.

1. В GitHub отвори файла `apps/web/js/env-config.js` (иконка молив за
   редакция направо в browser-а).
2. Промени реда:
   ```js
   window.PDF_MASTER_API_BASE = window.PDF_MASTER_API_BASE || 'http://localhost:4000/api';
   ```
   на:
   ```js
   window.PDF_MASTER_API_BASE = window.PDF_MASTER_API_BASE || 'https://ТВОЯ-RENDER-АДРЕС.onrender.com/api';
   ```
   (използвай реалния адрес от Стъпка 2, стъпка 7)
3. **Commit changes** — Vercel ще пре-деплойне сайта автоматично след
   няколко секунди (следи прогреса в Vercel Dashboard).
4. В Render Dashboard → твоята услуга → **Environment** → намери
   `CORS_ORIGIN` → смени стойността на твоя Vercel адрес
   (`https://pdf-master-pro-xxxx.vercel.app`, БЕЗ наклонена черта накрая)
   → Save Changes (Render ще рестартира услугата автоматично).

---

## Стъпка 5 — тествай

Отвори Vercel адреса си в browser. Опитай:
- Merge PDF с два тестови файла
- Регистрация на акаунт (`#/register`)
- Compress PDF

Ако нещо гърми с грешка "connection failed" — най-честата причина е
грешка в `env-config.js` адреса (Стъпка 4) или CORS_ORIGIN несъответствие.

> Забележка: първата заявка след период на неактивност ще е бавна
> (10-60 секунди) — Render Free приспива услугата след 15 мин без трафик.
> Това е нормално за безплатния план.

---

## Стъпка 6 — преди да приемаш истински пари (когато си готов)

Безплатният setup е чудесен за тестване и показване на приятели/първи
клиенти, но има ограничения преди сериозен бизнес:

1. **Upgrade Render до платен план (~$7/месец, "Starter")** — само така
   получаваш постоянен диск (акаунтите/файловете няма да изчезват) и
   услугата не заспива. Проектът вече има готов `render-paid.yaml` с
   конфигурация за постоянен диск — в Render Dashboard → New Blueprint,
   посочи `render-paid.yaml` вместо `render.yaml`, или просто смени плана
   и добави диск ръчно през Render Dashboard → Settings.
2. **Добави Stripe ключове** (виж `GO_LIVE_CHECKLIST.md`, Стъпка 3) —
   за истински плащания.
3. **Свържи домейн** (по желание, когато решиш кой): в Render → Settings
   → Custom Domain, и във Vercel → Settings → Domains. Ако използваш
   GoDaddy домейн, там просто добавяш DNS записите, които Render/Vercel
   ти покажат (обикновено CNAME записи) — GoDaddy → DNS Management →
   Add Record.
4. Пълния чеклист е в `GO_LIVE_CHECKLIST.md`.
