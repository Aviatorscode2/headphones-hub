import rawProducts from '../../../data/products';
import { getStockStatus } from '../../../lib/stockStore';

function applyOverrides(products) {
  return products.map((p) => ({
    ...p,
    variants: p.variants.map((v) => {
      const override = getStockStatus(p.id, v.color);
      return override !== null ? { ...v, inStock: override } : v;
    }),
  }));
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.status(200).json(applyOverrides(rawProducts));
}
