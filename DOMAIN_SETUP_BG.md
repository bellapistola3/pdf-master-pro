# Свързване на домейна pdfdavinci.com — стъпка по стъпка

Как е устроено приложението:

| Част | Къде живее | Адрес сега | Адрес след настройката |
|---|---|---|---|
| Сайт (папка `docs/`) | GitHub Pages | `bellapistola3.github.io/pdf-master-pro` | **https://pdfdavinci.com** |
| API (`apps/api`) | Render | `pdf-master-pro-api-fss5.onrender.com` | **https://api.pdfdavinci.com** (по желание) |

Файлът `docs/CNAME` вече съдържа `pdfdavinci.com`, а всички canonical/OG
линкове, `sitemap.xml` и `robots.txt` вече сочат към `https://pdfdavinci.com/`.

---

## Стъпка 1 — DNS записи при регистратора на домейна

Влез там, откъдето купи домейна (GoDaddy, Namecheap, Cloudflare, SuperHosting…)
→ **DNS / DNS Management / Zone editor**.

1. **Изтрий** стандартните (parking) `A` записи за `@` и `CNAME` за `www`,
   ако регистраторът е сложил такива.
2. Добави:

| Тип | Име (Host) | Стойност | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | по подразбиране |
| A | `@` | `185.199.109.153` | по подразбиране |
| A | `@` | `185.199.110.153` | по подразбиране |
| A | `@` | `185.199.111.153` | по подразбиране |
| AAAA | `@` | `2606:50c0:8000::153` | по подразбиране |
| AAAA | `@` | `2606:50c0:8001::153` | по подразбиране |
| AAAA | `@` | `2606:50c0:8002::153` | по подразбиране |
| AAAA | `@` | `2606:50c0:8003::153` | по подразбиране |
| CNAME | `www` | `bellapistola3.github.io` | по подразбиране |

(AAAA записите са за IPv6 — желателни, но не задължителни.)

> Ако използваш **Cloudflare**: остави записите в режим **DNS only**
> (сиво облаче), поне докато GitHub издаде HTTPS сертификата.

---

## Стъпка 2 — GitHub Pages

1. GitHub → repo `pdf-master-pro` → **Settings → Pages**.
2. **Source:** *Deploy from a branch* → Branch **`main`**, папка **`/docs`**.
3. **Custom domain:** `pdfdavinci.com` → **Save**
   (трябва да се вземе автоматично от `docs/CNAME`).
4. Изчакай "DNS check successful" (от няколко минути до няколко часа).
5. Сложи отметка **Enforce HTTPS** (става активна, когато сертификатът е готов,
   обикновено до ~1 час след успешната DNS проверка).

Препоръчително (защита от "превземане" на домейна): GitHub → твоят профил
→ **Settings → Pages → Add a domain** → `pdfdavinci.com` → добави TXT записа,
който GitHub ти покаже, при регистратора → **Verify**.

Проверка: `https://pdfdavinci.com` и `https://www.pdfdavinci.com` отварят
сайта (www пренасочва към основния).

---

## Стъпка 3 — Render (API) — задължително

Кажи на API-то, че вече приема заявки от новия домейн, иначе браузърът ще
блокира заявките (CORS грешка).

Render Dashboard → `pdf-master-pro-api` → **Environment**:

| Ключ | Стойност |
|---|---|
| `CORS_ORIGIN` | `https://pdfdavinci.com,https://www.pdfdavinci.com` |
| `APP_BASE_URL` | `https://pdfdavinci.com` |

Без интервали около запетаята и без `/` накрая. **Save Changes** → Render
рестартира услугата сам.

`APP_BASE_URL` се използва за адресите, към които Stripe връща клиента след
плащане — ако остане стария адрес, клиентите ще се връщат на github.io.

---

## Стъпка 4 — `api.pdfdavinci.com` (по желание, препоръчително)

Не е задължително — сайтът работи и с `onrender.com` адреса. Но изглежда
по-професионално и ако някой ден смениш хостинга, няма да пипаш кода.

1. Render → `pdf-master-pro-api` → **Settings → Custom Domains → Add** →
   `api.pdfdavinci.com`.
2. При регистратора добави:

   | Тип | Име | Стойност |
   |---|---|---|
   | CNAME | `api` | `pdf-master-pro-api-fss5.onrender.com` |

3. Изчакай Render да покаже **Verified** + сертификат.
4. Отвори `https://api.pdfdavinci.com/api/health` → трябва да видиш
   `{"status":"ok",...}`.
5. Чак тогава смени в **`docs/js/env-config.js`** и **`apps/web/js/env-config.js`**:
   ```js
   window.PDF_MASTER_API_BASE = window.PDF_MASTER_API_BASE || 'https://api.pdfdavinci.com/api';
   ```
6. Stripe Dashboard → **Developers → Webhooks** → смени endpoint-а на
   `https://api.pdfdavinci.com/api/billing/webhook`.

---

## Стъпка 5 — след като всичко работи

- [ ] Google Search Console → добави `pdfdavinci.com` (Domain property,
      потвърждава се с TXT запис) → **Sitemaps** → `https://pdfdavinci.com/sitemap.xml`.
- [ ] Имейл: ако искаш адрес като `support@pdfdavinci.com`, настрой го
      (Zoho Mail безплатно, Google Workspace, или пренасочване при
      регистратора) — трябват MX записи, които не пречат на горните.
- [ ] Попълни контактите в `js/legal-content.js` с новия имейл.

## Ако нещо не работи

| Симптом | Причина |
|---|---|
| GitHub казва "DNS check unsuccessful" | Записите още не са се разпространили (изчакай) или са останали старите parking `A` записи |
| "Enforce HTTPS" е сиво | Сертификатът още се издава — изчакай до 24ч; при Cloudflare изключи proxy (оранжевото облаче) |
| Сайтът се отваря, но инструментите дават "connection failed" | `CORS_ORIGIN` в Render не съдържа `https://pdfdavinci.com` (Стъпка 3) |
| 404 на `pdfdavinci.com` | Pages не е настроен на `main` + `/docs` (Стъпка 2) |
