import React from 'react'
import { useCart } from '../context/CartContext'

export default function CartModal() {
  const { cart, showCart, setShowCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  if (!showCart) return null

  return (
    <div className="cart-modal-overlay" onClick={() => setShowCart(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Shopping Cart</h2>
          <button className="close-btn" onClick={() => setShowCart(false)}>✕</button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="btn primary" onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.title} />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <div className="cart-item-price">${item.price}</div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <strong>${getCartTotal().toFixed(2)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <strong>Free</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <strong>${getCartTotal().toFixed(2)}</strong>
                  </div>
                </div>
                <div className="cart-actions">
                  <button className="btn ghost" onClick={clearCart}>Clear Cart</button>
                  <button className="btn primary">Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
