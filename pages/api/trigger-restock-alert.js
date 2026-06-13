// Novu restock notification trigger.
// Replace the NOVU_API_KEY env var and uncomment the Novu SDK call to go live.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    subscriberId = 'demo-customer',
    productName,
    variant,
    productUrl,
  } = req.body;

  if (!productName || !variant || !productUrl) {
    return res.status(400).json({ error: 'productName, variant, and productUrl are required' });
  }

  const payload = {
    subscriberId,
    productName,
    variant,
    productUrl,
    message: `Good news — ${productName} is back in stock in ${variant}. View it here: ${productUrl}`,
  };

  if (!process.env.NOVU_API_KEY) {
    console.log('[trigger-restock-alert] NOVU_API_KEY not set. Intended notification payload:');
    console.log(JSON.stringify(payload, null, 2));
    return res.status(200).json({
      success: true,
      simulated: true,
      message: 'Novu not configured. Notification payload logged to server console.',
      payload,
    });
  }

  // Uncomment when Novu is configured:
  // const { Novu } = await import('@novu/node');
  // const novu = new Novu(process.env.NOVU_API_KEY);
  // await novu.trigger('restock-alert', {
  //   to: { subscriberId },
  //   payload: { productName, variant, productUrl },
  // });

  return res.status(200).json({ success: true, payload });
}
