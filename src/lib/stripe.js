import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(guideId) {
  const guide = {
    'tested-real-estate-investment-strategy': {
      price: 'NEXT_PUBLIC_STRIPE_PRICE_REAL_ESTATE',
      name: 'Tested Real Estate Investment Strategy'
    },
    'the-agentic-income-era': {
      price: 'NEXT_PUBLIC_STRIPE_PRICE_AGENTIC',
      name: 'The Agentic Income Era'
    },
    'leveraging-digital-assets': {
      price: 'NEXT_PUBLIC_STRIPE_PRICE_DIGITAL',
      name: 'Leveraging Digital Assets'
    },
    'strategic-funding-guide': {
      price: 'NEXT_PUBLIC_STRIPE_PRICE_FUNDING',
      name: 'Strategic Funding Guide'
    }
  }[guideId];

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env[guide.price],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/guides/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/guides/${guideId}`,
    metadata: {
      guideId,
    },
  });

  return session;
}

export async function getSession(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}
