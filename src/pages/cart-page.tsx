import { Link, useNavigate } from 'react-router-dom'
import {
  getCartItems,
  getCartTotal,
  removeFromCart,
  setCartItemQuantity,
} from '../store/cart-store'
import { showToast } from '../ui/ui-toast/ui-toast-store'
import { formatPrice } from '../ui/ui-format'
import '../ui/ui-cart.css'

export default function CartPage() {
  const navigate = useNavigate()
  const items = getCartItems()

  const subtotal = items.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
  const total = getCartTotal()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  function handleDecrease(id: string, current: number) {
    setCartItemQuantity(id, current - 1)
    navigate(0)
  }

  function handleIncrease(id: string, current: number) {
    setCartItemQuantity(id, current + 1)
    navigate(0)
  }

  function handleRemove(id: string) {
    removeFromCart(id)
    showToast('Removed from cart', 'danger')
    navigate(0)
  }

  if (!items.length) {
    return (
      <div className="ui-cart-page">
        <h1 className="h3 mb-2">Cart</h1>
        <p className="text-muted">Your cart is empty.</p>
        <Link
          className="ui-btn-primary d-inline-flex justify-content-center align-items-center"
          to="/"
        >
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="ui-cart-page">
      <Link to="/" className="ui-back-link">
        ← Back to shop
      </Link>

      <h1 className="h3 mb-1">Cart</h1>
      <div className="text-muted ui-cart-subtitle">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </div>

      <div className="ui-cart-layout">
        {/* Left: items */}
        <div className="ui-cart-list">
          {items.map((item) => {
            const hasOldPrice = item.price > item.discountedPrice
            return (
              <div className="ui-cart-card" key={item.id}>
                <img src={item.imageUrl} alt={item.imageAlt} className="ui-cart-thumb" />

                <div className="ui-cart-card-body">
                  <button
                    type="button"
                    className="ui-cart-remove"
                    aria-label="Remove item"
                    onClick={() => handleRemove(item.id)}
                  >
                    ×
                  </button>

                  <div className="ui-cart-title">{item.title}</div>

                  <div className="ui-cart-price">
                    <span className="ui-cart-price-new">{formatPrice(item.discountedPrice)}</span>
                    {hasOldPrice ? (
                      <span className="ui-cart-price-old">{formatPrice(item.price)}</span>
                    ) : null}
                  </div>

                  <div className="ui-cart-qty">
                    <button
                      type="button"
                      className="ui-qty-btn"
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span className="ui-qty-value">{item.quantity}</span>

                    <button
                      type="button"
                      className="ui-qty-btn"
                      onClick={() => handleIncrease(item.id, item.quantity)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: summary */}
        <aside className="ui-cart-summary">
          <h2 className="h4 mb-3">Summary</h2>

          <div className="ui-summary-row">
            <span className="fw-semibold">Subtotal:</span>
            <span className="fw-semibold">{formatPrice(subtotal)}</span>
          </div>

          <div className="ui-summary-row ui-summary-row--total">
            <span className="fw-semibold">Total:</span>
            <span className="fw-semibold">{formatPrice(total)}</span>
          </div>

          <Link
            className="ui-btn-primary d-inline-flex justify-content-center align-items-center ui-summary-btn"
            to="/checkout-success"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  )
}
