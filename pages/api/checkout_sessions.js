const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

async function handler(req, res) {
  if (req.method === 'POST') {
    const cartItems = req.body;
    console.log(cartItems);

    try {
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1MYcHkFI7xSDre26zSaKt7fT' },
          { shipping_rate: 'shr_1MYcKeFI7xSDre26Cbr80HD6' },
        ],
        line_items: cartItems.map(item => {
          const img = item.images[0].asset._ref;
          const newImg = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/ax6crp0b/production/'
            )
            .replace('-webp', '.webp');
          console.log('IMAGE', newImg);

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default handler;
