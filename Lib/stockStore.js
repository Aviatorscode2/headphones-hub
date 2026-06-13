// In-memory stock status overrides for the demo session.
// Keys are "productId:color", values are booleans.
// Resets when the server restarts, which is fine for demo purposes.
const overrides = new Map();

function getStockStatus(productId, color) {
  const key = `${productId}:${color}`;
  if (overrides.has(key)) return overrides.get(key);
  return null; // null means fall back to products.js default
}

function setStockStatus(productId, color, inStock) {
  const key = `${productId}:${color}`;
  overrides.set(key, Boolean(inStock));
}

module.exports = { getStockStatus, setStockStatus };
