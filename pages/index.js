import React from 'react';
import Link from 'next/link';
import rawProducts from '../data/products';
import { getStockStatus } from '../Lib/stockStore';

function applyOverrides(products) {
  return products.map((p) => ({
    ...p,
    variants: p.variants.map((v) => {
      const override = getStockStatus(p.id, v.color);
      return override !== null ? { ...v, inStock: override } : v;
    }),
  }));
}

export default function Home({ products }) {
  return (
    <div>
      <div className="hero-simple">
        <div className="hero-simple-text">
          <h1>Headphones Hub</h1>
          <p>Premium headphones for every use case</p>
        </div>
      </div>

      <div className="assistant-banner">
        <div className="assistant-banner-inner">
          <div className="assistant-icon">&#x1F3A7;</div>
          <div>
            <h3>Not sure what to buy?</h3>
            <p>
              Ask our shopping assistant to check availability, compare similar headphones, and
              notify you when an item is back in stock.
            </p>
          </div>
        </div>
      </div>

      <div className="products-heading">
        <h2>Our Headphones</h2>
        <p>Find the perfect pair for commuting, calls, gaming, or travel</p>
      </div>

      <div className="products-container">
        {products.map((product) => {
          const hasOutOfStock = product.variants.some((v) => !v.inStock);
          const allOutOfStock = product.variants.every((v) => !v.inStock);
          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="product-card">
                <div
                  className="product-image-placeholder"
                  style={{ backgroundColor: product.color + '22', color: product.color }}
                >
                  {product.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
                <div className="product-card-body">
                  <p className="product-name">{product.name}</p>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                  <div className="product-card-badges">
                    {allOutOfStock ? (
                      <span className="badge badge-out-of-stock">Out of stock</span>
                    ) : hasOutOfStock ? (
                      <span className="badge badge-partial">Some colors out of stock</span>
                    ) : (
                      <span className="badge badge-in-stock">In stock</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="homepage-admin-link">
        <Link href="/admin/products">Admin: Manage stock</Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const products = applyOverrides(rawProducts);
  return { props: { products } };
}
