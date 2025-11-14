import React from 'react'
import { useCart } from '../../contexts/CartContext'
import './Cart.css'

const Cart = () => {
  const { cart, getCartCount, removeFromCart, clearCart } = useCart()
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)

  return (
    <div className="cart-page">
      <h1 className="page-title">Carts</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-card">
                <div className="cart-image">150 × 150</div>
                <div className="cart-info">
                  <p className="cart-description">{item.description}</p>
                  <p className="cart-price">${item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Products: <span className="item-count">{getCartCount()} items</span> -
              Total price:<span className="total-price"> ${total.toFixed(2)}</span>
            </p>
            <div className="cart-actions">
              <button className="checkout-btn">Checkout <i class="bi bi-credit-card"></i></button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
