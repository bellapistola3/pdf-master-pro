# Go-live checklist — from code to real revenue

Follow this in order. Each step is something that actually blocks you from
safely charging real customers, not busywork.

## 1. Legal entity & business basics (do this first — it blocks Stripe)
- [ ] Register a business entity (or confirm you can trade as a sole
      trader/freelancer in your jurisdiction) — Stripe requires this to
      activate a live account and payout to a bank account.
- [ ] Open a business bank account for payouts.
- [ ] Decide your VAT position. If you have EU customers, look into
      **Stripe Tax** (can auto-calculate/collect VAT/OSS) — manually
      handling EU VAT across 27 countries is a real compliance burden.
- [ ] Fill in the `[BRACKETED PLACEHOLDERS]` in
      `apps/web/js/legal-content.js` (company name, address, registration
      number, contact email, refund policy, governing law) and have a
      lawyer review the Terms of Service and Privacy Policy before
      launch — the shipped text is a reasonable starting template, not
      legal advice.

## 2. Domain & DNS
- [ ] Buy a domain.
- [ ] Point it at your web deployment (Vercel/Netlify auto-provision
      HTTPS certs) and a subdomain (e.g. `api.yourdomain.com`) at your
      API deployment (Render/Fly/Railway also auto-provision HTTPS).
- [ ] Update `apps/web/js/env-config.js` → `PDF_MASTER_API_BASE` to the
      real API subdomain.
- [ ] Update `.env` → `APP_BASE_URL` to the real web domain (used to
      build Stripe checkout/portal redirect links).
- [ ] Update `robots.txt` and `sitemap.xml` with the real domain.

## 3. Stripe — the actual revenue path
- [ ] Create a Stripe account, complete business verification (needed
      for live mode, not just test mode).
- [ ] Create two Products with recurring Prices: **Pro** and
      **Business**. Copy their Price IDs.
- [ ] Set on your API host: `STRIPE_SECRET_KEY` (live, starts `sk_live_`),
      `STRIPE_PRICE_ID_PRO`, `STRIPE_PRICE_ID_BUSINESS`.
- [ ] In the Stripe Dashboard, add a webhook endpoint pointing at
      `https://api.yourdomain.com/api/billing/webhook`, subscribed to at
      minimum: `checkout.session.completed`, `customer.subscription.updated`,
      `customer.subscription.deleted`. Copy the signing secret into
      `STRIPE_WEBHOOK_SECRET`.
- [ ] **Test the full loop in Stripe test mode before going live:**
      register a test account on your deployed app → subscribe with
      Stripe's test card `4242 4242 4242 4242` → confirm
      `GET /api/auth/me` shows `plan: "pro"` within a few seconds →
      cancel via "Manage billing" (Stripe Customer Portal) → confirm the
      plan reverts to `free` after the current period ends (or
      immediately, depending on how you configure cancellation in the
      Stripe Dashboard's Customer Portal settings).
- [ ] Enable the Stripe Customer Portal itself in the Stripe Dashboard
      (Settings → Billing → Customer portal) — the app's "Manage billing"
      button opens it, but it must be activated for your account first.
- [ ] Flip Stripe to live mode, swap in live keys, repeat the loop once
      with a real card for real money before announcing publicly.

## 4. Production security hardening
- [ ] Set a strong, random `JWT_SECRET` (Render's blueprint auto-generates
      one — see `render.yaml`).
- [ ] Set `CORS_ORIGIN` to your exact web domain — **never** leave it as
      `*` once real user tokens exist.
- [ ] Run `npm audit` in `apps/api` and address anything above "low"
      severity. This build already bumped `multer` to v2 for a known DoS
      CVE — check for anything newer at deploy time.
- [ ] Confirm `NODE_ENV=production` is set (this changes logging format
      and a few Express defaults).
- [ ] Decide your data-retention story for logs (the default `morgan`
      combined log includes IPs — make sure that's consistent with your
      Privacy Policy).

## 5. Reliability for a paying customer base
- [ ] **Switch Render from `render.yaml` (free) to `render-paid.yaml`
      (Starter + persistent disk)** — the free plan has no persistent
      disk, so user accounts and job history reset on every redeploy.
      This alone will lose you real customer data if skipped.
- [ ] Move job/user storage off local-disk JSON to Postgres
      (`docs/DATABASE.md`) before you have concurrent traffic across
      more than one API instance — the JSON files are not safe for
      concurrent multi-instance writes.
- [ ] Move file storage to S3-compatible storage (`docs/STORAGE.md`) if
      you'll run more than one API instance, or want files to survive a
      redeploy without a persistent disk.
- [ ] Add error monitoring (Sentry or similar) — at minimum, wrap
      `server.ts`'s error handler to report to a monitoring service
      instead of only `console.error`.
- [ ] Set up uptime monitoring on `/api/health` (UptimeRobot, Better
      Uptime, or your host's built-in health checks — Render already
      uses `healthCheckPath` from `render.yaml`).
- [ ] Load-test the CPU-heavy tools (compress, OCR, redact) at your
      expected concurrency — these shell out to Ghostscript/Tesseract
      and can saturate a small instance quickly. Size your Render/Fly
      plan accordingly (see the `plan:` line in `render.yaml`).

## 6. Before announcing publicly
- [ ] Test the free-plan daily quota actually blocks the 6th operation
      (`FREE_DAILY_OPS=5` by default).
- [ ] Test the Pro plan's higher file-size limit actually applies
      (`MAX_FILE_SIZE_MB_PRO`).
- [ ] Fill in real contact info in the footer/legal pages — a support
      email that you actually monitor.
- [ ] Decide whether to enable the optional advanced tools (LibreOffice
      Office-conversion, Puppeteer HTML-to-PDF — see README Section 2)
      before or after launch; they're not required for the MVP tool set
      to generate revenue.
- [ ] Have at least one other person register, subscribe, use 3–4 tools,
      and cancel — on the *deployed* app, not locally — before you send
      traffic to it.

## What NOT to worry about for v1 revenue
To keep this list honest: none of the following block you from charging
money on day one, so don't let them delay launch —
- Full 33-tool parity (the 20+ working tools already cover the vast
  majority of real-world PDF requests).
- Mobile app store submission (the web app alone is a complete, sellable
  product; ship mobile as a v1.1).
- OAuth login (email/password works fine to start).
- Office/HTML-to-PDF conversion (clearly marked "roadmap" in the UI —
  honest scoping doesn't cost you sales the way a broken/fake button would).
