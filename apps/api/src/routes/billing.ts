import { Router } from 'express';
import Stripe from 'stripe';
import { config } from '../config';
import { requireAuth, AuthedRequest } from '../middleware/auth';
import { findUserById, findUserByStripeCustomerId, updateUser, Plan } from '../services/userStore';

export const billingRouter = Router();

function stripeClient(): Stripe {
  if (!config.stripe.secretKey) {
    throw Object.assign(new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in .env.'), { status: 501 });
  }
  return new Stripe(config.stripe.secretKey);
}

function priceIdForPlan(plan: 'pro' | 'business'): string {
  return plan === 'business' ? config.stripe.priceIdBusiness : config.stripe.priceIdPro;
}

function planForPriceId(priceId: string): Plan {
  if (priceId === config.stripe.priceIdBusiness) return 'business';
  if (priceId === config.stripe.priceIdPro) return 'pro';
  return 'free';
}

/**
 * Creates a real Stripe Checkout Session for a subscription. Requires
 * STRIPE_SECRET_KEY + STRIPE_PRICE_ID_PRO/BUSINESS to be set — without
 * them this returns a clear 501, never a fake checkout URL.
 */
billingRouter.post('/create-checkout-session', requireAuth, async (req: AuthedRequest, res) => {
  try {
    const stripe = stripeClient();
    const plan = req.body.plan as 'pro' | 'business';
    const priceId = priceIdForPlan(plan);
    if (!priceId) return res.status(400).json({ error: `No Stripe price configured for plan "${plan}"` });

    const user = findUserById(req.userId!);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Reuse an existing Stripe customer if we already created one for this user.
    let customerId = user.stripeCustomerId ?? undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, metadata: { userId: user.id } });
      customerId = customer.id;
      updateUser(user.id, { stripeCustomerId: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.body.successUrl || config.appBaseUrl}/#/dashboard?checkout=success`,
      cancel_url: `${req.body.cancelUrl || config.appBaseUrl}/#/pricing?checkout=cancelled`,
      client_reference_id: user.id,
      metadata: { userId: user.id, plan },
    });

    res.json({ checkoutUrl: session.url });
  } catch (err: any) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/**
 * Stripe Customer Portal — lets a subscribed user manage/cancel their own
 * subscription without any custom UI. Real, working, requires only that
 * the user already has a stripeCustomerId (i.e. has checked out before).
 */
billingRouter.post('/create-portal-session', requireAuth, async (req: AuthedRequest, res) => {
  try {
    const stripe = stripeClient();
    const user = findUserById(req.userId!);
    if (!user?.stripeCustomerId) {
      return res.status(400).json({ error: 'No billing account found for this user yet — subscribe first.' });
    }
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${req.body.returnUrl || config.appBaseUrl}/#/dashboard`,
    });
    res.json({ portalUrl: portalSession.url });
  } catch (err: any) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

/**
 * Stripe webhook — the ONLY place a user's plan actually changes. Verifies
 * the signature with the real Stripe SDK (not hand-rolled HMAC), then:
 *   - checkout.session.completed          → set plan from the purchased price, store subscription id
 *   - customer.subscription.updated       → re-sync plan from the current price (handles upgrades/downgrades)
 *   - customer.subscription.deleted       → revert to 'free'
 *
 * Mounted with express.raw() in server.ts (Stripe needs the exact raw bytes
 * to verify the signature — mounting JSON-parsed body here would break it).
 */
billingRouter.post('/webhook', async (req, res) => {
  if (!config.stripe.webhookSecret || !config.stripe.secretKey) {
    return res.status(501).json({ error: 'STRIPE_WEBHOOK_SECRET / STRIPE_SECRET_KEY not configured' });
  }
  const stripe = new Stripe(config.stripe.secretKey);
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, config.stripe.webhookSecret);
  } catch (err: any) {
    console.error('[stripe webhook] signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || (session.client_reference_id ?? undefined);
        const plan = (session.metadata?.plan as Plan) || 'pro';
        if (userId) {
          updateUser(userId, {
            plan,
            stripeCustomerId: (session.customer as string) ?? undefined,
            stripeSubscriptionId: (session.subscription as string) ?? undefined,
          });
          console.log(`[stripe webhook] user ${userId} upgraded to ${plan}`);
        }
        break;
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const user = findUserByStripeCustomerId(sub.customer as string);
        if (user) {
          const priceId = sub.items.data[0]?.price?.id;
          const plan = sub.status === 'active' || sub.status === 'trialing' ? planForPriceId(priceId || '') : 'free';
          updateUser(user.id, { plan, stripeSubscriptionId: sub.id });
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const user = findUserByStripeCustomerId(sub.customer as string);
        if (user) {
          updateUser(user.id, { plan: 'free', stripeSubscriptionId: null });
          console.log(`[stripe webhook] user ${user.id} downgraded to free (subscription ended)`);
        }
        break;
      }
      default:
        // Unhandled event types are fine to ignore — Stripe sends many more than we act on.
        break;
    }
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('[stripe webhook] handler error:', err);
    // Return 500 so Stripe retries — do NOT return 200 on a handler failure,
    // or a transient DB error would silently drop a paid upgrade.
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});
