import React from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import rawProducts from '../../data/products';
import { getStockStatus } from '../../Lib/stockStore';
import { useStateContext } from '../../context/StateContext';

function applyOverrides(product) {
  return {
    ...product,
    variants: product.variants.map((v) => {
      const override = getStockStatus(product.id, v.color);
      return override !== null ? { ...v, inStock: override } : v;
    }),
  };
}

export default function ProductDetail({ product, similarProducts }) {
  const anyInStock = product.variants.some((v) => v.inStock);
  const { qty, incQty, decQty, onAdd, setShowCart } = useStateContext();

  function handleAddToCart() {
    onAdd({ ...product, _id: product.id }, qty);
  }

  function handleBuyNow() {
    onAdd({ ...product, _id: product.id }, qty);
    setShowCart(true);
  }

  const productDataJson = JSON.stringify({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    currency: product.currency,
    description: product.description,
    batteryLifeHours: product.batteryLifeHours,
    noiseCancellation: product.noiseCancellation,
    hasMicrophone: product.hasMicrophone,
    recommendationAngle: product.recommendationAngle,
    variants: product.variants,
    useCases: product.useCases,
    similarProductIds: product.similarProductIds,
    url: `/products/${product.id}`,
  });

  return (
    <div className="product-detail-page">
      <script
        id="product-data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: productDataJson }}
      />

      <div className="pd-breadcrumb">
        <Link href="/">Home</Link> &rsaquo; <Link href="/">Products</Link> &rsaquo;{' '}
        <span>{product.name}</span>
      </div>

      <div className="pd-container">
        <div className="pd-image-col">
          <div
            className="pd-image-box"
            style={{ backgroundColor: product.color + '22' }}
          >
            <div
              className="pd-image-placeholder"
              style={{ color: product.color }}
            >
              {product.name
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </div>
          </div>
        </div>

        <div className="pd-info-col">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">${product.price} <span className="pd-currency">{product.currency}</span></p>
          <p className="pd-description">{product.description}</p>

          <div className="pd-section">
            <h3>Available Colors</h3>
            <div className="pd-variants">
              {product.variants.map((v) => (
                <div key={v.color} className="pd-variant">
                  <span className="pd-variant-color">{v.color}</span>
                  {v.inStock ? (
                    <span className="badge badge-in-stock">In stock</span>
                  ) : (
                    <span className="badge badge-out-of-stock">Out of stock</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <h3>Use Cases</h3>
            <div className="pd-tags">
              {product.useCases.map((u) => (
                <span key={u} className="pd-tag">{u}</span>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <h3>Key Features</h3>
            <ul className="pd-features">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="pd-specs">
            <div className="pd-spec-item">
              <span className="pd-spec-label">Battery life</span>
              <span className="pd-spec-value">{product.batteryLifeHours} hours</span>
            </div>
            <div className="pd-spec-item">
              <span className="pd-spec-label">Noise cancellation</span>
              <span className="pd-spec-value">{product.noiseCancellation ? 'Yes' : 'No'}</span>
            </div>
            <div className="pd-spec-item">
              <span className="pd-spec-label">Built-in microphone</span>
              <span className="pd-spec-value">{product.hasMicrophone ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className="pd-recommendation">
            <strong>Why buy this?</strong> {product.recommendationAngle}
          </div>

          {anyInStock && (
            <>
              <div className="quantity">
                <h3>Quantity</h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                </p>
              </div>
              <div className="buttons">
                <button type="button" className="add-to-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button type="button" className="buy-now" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="pd-similar">
          <h2>Similar Products</h2>
          <div className="pd-similar-grid">
            {similarProducts.map((sp) => {
              const anyVariantInStock = sp.variants.some((v) => v.inStock);
              return (
                <Link key={sp.id} href={`/products/${sp.id}`}>
                  <div className="pd-similar-card">
                    <div
                      className="pd-similar-image"
                      style={{ backgroundColor: sp.color + '22', color: sp.color }}
                    >
                      {sp.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </div>
                    <div className="pd-similar-info">
                      <p className="pd-similar-name">{sp.name}</p>
                      <p className="pd-similar-price">${sp.price}</p>
                      {!anyVariantInStock && (
                        <span className="badge badge-out-of-stock">Out of stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = rawProducts.map((p) => ({ params: { slug: p.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = rawProducts.find((p) => p.id === params.slug);
  if (!product) return { notFound: true };

  const withOverrides = applyOverrides(product);

  const similarProducts = rawProducts
    .filter((p) => product.similarProductIds.includes(p.id))
    .map(applyOverrides);

  return {
    props: { product: withOverrides, similarProducts },
    revalidate: 1,
  };
}
