import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  async function fetchProducts() {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function toggleStock(productId, color, currentInStock) {
    setMessage('');
    const res = await fetch('/api/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, color, inStock: !currentInStock }),
    });
    const data = await res.json();
    setMessage(data.message);
    await fetchProducts();

    if (!currentInStock) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        await fetch('/api/trigger-restock-alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscriberId: 'demo-customer',
            productName: product.name,
            variant: color,
            productUrl: `${window.location.origin}/products/${productId}`,
          }),
        });
      }
    }
  }

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin — Product Stock Management</h1>
        <Link href="/" className="admin-back-link">Back to store</Link>
      </div>

      <p className="admin-note">
        Use this page to simulate restock events. Changing a variant from out of stock to in stock
        will trigger the Novu notification placeholder.
      </p>

      {message && <div className="admin-message">{message}</div>}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Color</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) =>
              product.variants.map((variant) => (
                <tr key={`${product.id}-${variant.color}`}>
                  <td>
                    <Link href={`/products/${product.id}`} className="admin-product-link">
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className="admin-color-dot" style={{ backgroundColor: product.color }} />
                    {variant.color}
                  </td>
                  <td>
                    {variant.inStock ? (
                      <span className="badge badge-in-stock">In stock</span>
                    ) : (
                      <span className="badge badge-out-of-stock">Out of stock</span>
                    )}
                  </td>
                  <td>
                    <button
                      className={`admin-btn ${variant.inStock ? 'admin-btn-oos' : 'admin-btn-restock'}`}
                      onClick={() => toggleStock(product.id, variant.color, variant.inStock)}
                    >
                      {variant.inStock ? 'Mark as out of stock' : 'Mark as in stock'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
