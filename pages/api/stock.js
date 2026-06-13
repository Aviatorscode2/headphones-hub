import rawProducts from '../../data/products';
import { getStockStatus, setStockStatus } from '../../Lib/stockStore';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId, color, inStock } = req.body;

  if (!productId || !color || inStock === undefined) {
    return res.status(400).json({ error: 'productId, color, and inStock are required' });
  }

  const product = rawProducts.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const variant = product.variants.find((v) => v.color === color);
  if (!variant) {
    return res.status(404).json({ error: 'Variant not found' });
  }

  setStockStatus(productId, color, inStock);

  return res.status(200).json({
    productId,
    color,
    inStock: Boolean(inStock),
    message: `${product.name} — ${color} marked as ${inStock ? 'in stock' : 'out of stock'}`,
  });
}
