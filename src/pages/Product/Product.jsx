import React from 'react'
import { useCart } from '../../contexts/CartContext'
import './Product.css'

const Product = () => {
  const { addToCart, getCartCount, isInCart } = useCart()

  const products = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (Math.random() * 50 + 5).toFixed(2),
    description: 'officia porro iure quia iusto qui ipsa ut modi',
  }))

  return (
    <div className="product-page">
      <h1 className="page-title">Products ({getCartCount()})</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">150 × 150</div>
            <div className="product-info">
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button
                className={`cart-btn ${isInCart(product.id) ? 'added' : ''}`}
                onClick={() => addToCart(product)}
                disabled={isInCart(product.id)}
              >
                {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
