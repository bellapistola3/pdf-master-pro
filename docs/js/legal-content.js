const LEGAL = {
  bg: {
    terms: `
**Последна актуализация:** ${new Date().toISOString().slice(0, 10)}

Тези Общи условия уреждат използването на PDF Master Pro ("Услугата"),
предоставяна от [ИМЕ НА ДРУЖЕСТВОТО / ЕИК] ("ние", "нас").

**1. Услугата**
PDF Master Pro предоставя онлайн инструменти за обработка на PDF файлове
(обединяване, компресиране, конвертиране, подписване, защита и др.),
достъпни чрез уеб сайт, мобилно приложение и API.

**2. Акаунт**
За използване на определени функции е необходима регистрация. Вие сте
отговорни за опазването на данните за достъп до акаунта си.

**3. Абонаменти и плащания**
Платените планове (Pro, Business) се таксуват периодично чрез Stripe.
Цените са посочени на страницата с цени. Можете да управлявате или
прекратите абонамента си по всяко време през Stripe Customer Portal
(достъпен от таблото ви).

**4. Възстановяване на суми**
[ОПИШЕТЕ ВАШАТА ПОЛИТИКА ЗА ВЪЗСТАНОВЯВАНЕ — напр. 14-дневен период за
връщане съгласно правата на потребителите в ЕС при дистанционни договори,
освен ако услугата вече не е била използвана съществено.]

**5. Файлове и съдържание**
Вие запазвате всички права върху файловете, които качвате. Файловете се
обработват автоматично и се изтриват съгласно политиката за съхранение
(вижте Политика за поверителност). Забранено е качването на съдържание,
което нарушава закона или права на трети лица.

**6. Ограничение на отговорността**
Услугата се предоставя "както е". Не гарантираме, че обработката на всеки
файл ще бъде безгрешна за 100% от случаите (напр. базовото PDF→Word
преобразуване не възстановява сложни оформления). Не носим отговорност за
загуба на данни — препоръчваме да пазите оригинални копия на файловете си.

**7. Визуален подпис**
Функцията "Подпиши PDF" създава визуален подпис и НЕ е квалифициран
електронен подпис по смисъла на Регламент (ЕС) № 910/2014 (eIDAS).

**8. Промени**
Можем да актуализираме тези условия. Съществени промени ще бъдат
съобщени чрез имейл или известие в приложението.

**9. Приложимо право**
[ПОСОЧЕТЕ ЮРИСДИКЦИЯ — напр. Република България.]

**10. Контакт**
[ВАШИЯТ EMAIL ЗА КОНТАКТ]

---
⚠️ Това е шаблонен текст. Преди реално стартиране на платена услуга,
консултирайте се с юрист за съответствие с българското и европейското
законодателство (вкл. Закон за защита на потребителите, ЗЗЛД/GDPR,
Закон за електронната търговия).`,
    privacy: `
**Последна актуализация:** ${new Date().toISOString().slice(0, 10)}

**1. Администратор на данни**
[ИМЕ НА ДРУЖЕСТВОТО, АДРЕС, ЕИК, EMAIL ЗА ВРЪЗКА С АДМИНИСТРАТОРА НА ЛИЧНИ ДАННИ]

**2. Какви данни обработваме**
- Данни за акаунт: имейл, хеширана парола.
- Данни за плащане: обработват се directly от Stripe — ние не съхраняваме
  номера на карти.
- Файлове, които качвате: обработват се временно и се изтриват автоматично
  (2 часа за безплатен план, 24 часа за Pro), освен ако изрично не изберете
  да ги запазите.
- Технически данни: IP адрес (за rate limiting и сигурност), анонимен
  идентификатор за неregистрирани потребители.

**3. Правно основание**
Обработваме данните ви на основание изпълнение на договор (чл. 6, §1, б.
"б" GDPR) и легитимен интерес за сигурност на услугата (чл. 6, §1, б. "е").

**4. Съхранение**
Файловете се изтриват автоматично след обработка съгласно посочените по-горе
срокове. Данните за акаунта се съхраняват докато поддържате акаунт при нас.

**5. Вашите права по GDPR**
Имате право на достъп, коригиране, изтриване, ограничаване на обработката,
преносимост на данните и право на възражение. За упражняване на правата си,
свържете се на [EMAIL].

**6. Трети страни**
Използваме Stripe (плащания) и, ако е конфигуриран, доставчик на AI модел
(OpenAI/Anthropic/Google) единствено за функциите AI резюме/Chat with PDF —
съдържанието на документа се изпраща към избрания доставчик само при изрично
използване на тези функции.

**7. Бисквитки**
[ОПИШЕТЕ ИЗПОЛЗВАНИТЕ БИСКВИТКИ, ако добавите анализи/маркетинг инструменти.]

**8. Контакт**
[ВАШИЯТ EMAIL ЗА КОНТАКТ / DPO, ако е приложимо]

---
⚠️ Това е шаблонен текст, а не правен съвет. Преди реално стартиране,
консултирайте се с юрист за пълно съответствие с GDPR и Закона за защита
на личните данни.`,
  },
  en: {
    terms: `
**Last updated:** ${new Date().toISOString().slice(0, 10)}

These Terms of Service govern your use of PDF Master Pro (the "Service"),
provided by [COMPANY NAME / REGISTRATION NUMBER] ("we", "us").

**1. The Service**
PDF Master Pro provides online PDF processing tools (merge, compress,
convert, sign, protect, etc.) via a website, mobile app, and API.

**2. Accounts**
Some features require registration. You are responsible for safeguarding
your account credentials.

**3. Subscriptions & payment**
Paid plans (Pro, Business) are billed on a recurring basis via Stripe.
Pricing is shown on the pricing page. You can manage or cancel your
subscription at any time via the Stripe Customer Portal (available from
your dashboard).

**4. Refunds**
[DESCRIBE YOUR REFUND POLICY — e.g. a 14-day EU consumer right of
withdrawal for distance contracts, unless the service has already been
substantially used.]

**5. Files & content**
You retain all rights to files you upload. Files are processed
automatically and deleted per the retention policy (see Privacy Policy).
Uploading content that violates the law or third-party rights is
prohibited.

**6. Limitation of liability**
The Service is provided "as is". We do not guarantee error-free
processing for 100% of files (e.g. basic PDF-to-Word does not reconstruct
complex layouts). We are not liable for data loss — keep original copies
of your files.

**7. Visual signature**
The "Sign PDF" feature creates a visual signature and is NOT a qualified
electronic signature under Regulation (EU) No 910/2014 (eIDAS).

**8. Changes**
We may update these terms. Material changes will be communicated by email
or in-app notice.

**9. Governing law**
[SPECIFY JURISDICTION.]

**10. Contact**
[YOUR CONTACT EMAIL]

---
⚠️ This is template text. Before launching a real paid service, consult a
lawyer for compliance with applicable consumer-protection, e-commerce, and
data-protection law in your jurisdiction.`,
    privacy: `
**Last updated:** ${new Date().toISOString().slice(0, 10)}

**1. Data controller**
[COMPANY NAME, ADDRESS, REGISTRATION NUMBER, CONTACT EMAIL]

**2. What we process**
- Account data: email, hashed password.
- Payment data: handled directly by Stripe — we never store card numbers.
- Files you upload: processed temporarily and deleted automatically
  (2 hours on the free plan, 24 hours on Pro) unless you explicitly choose
  to keep them.
- Technical data: IP address (rate limiting & security), an anonymous ID
  for unregistered users.

**3. Legal basis**
We process your data based on contract performance (GDPR Art. 6(1)(b))
and legitimate interest in service security (Art. 6(1)(f)).

**4. Retention**
Files are deleted automatically after processing per the periods above.
Account data is retained while you maintain an account with us.

**5. Your GDPR rights**
You have the right to access, rectify, erase, restrict processing, port
your data, and object to processing. Contact [EMAIL] to exercise these
rights.

**6. Third parties**
We use Stripe (payments) and, if configured, an AI model provider
(OpenAI/Anthropic/Google) solely for the AI Summary/Chat with PDF
features — document content is sent to the selected provider only when
you explicitly use those features.

**7. Cookies**
[DESCRIBE COOKIES USED, if you add analytics/marketing tools.]

**8. Contact**
[YOUR CONTACT EMAIL / DPO if applicable]

---
⚠️ This is template text, not legal advice. Consult a lawyer for full
GDPR and consumer-law compliance before a real launch.`,
  },
};
