import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req) {
  try {
    const { guideId } = await req.json();
    
    if (!guideId) {
      return new Response(JSON.stringify({ error: 'Guide ID is required' }), { 
        status: 400 
      });
    }

    const session = await createCheckoutSession(guideId);
    return new Response(JSON.stringify({ url: session.url }));
    
  } catch (error) {
    console.error('Checkout session error:', error);
    return new Response(JSON.stringify({ error: 'Error creating checkout session' }), { 
      status: 500 
    });
  }
}
