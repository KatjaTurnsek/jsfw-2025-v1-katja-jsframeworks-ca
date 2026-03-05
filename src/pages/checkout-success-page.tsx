import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clearCart } from '../store/cart-store'
import '../ui/ui-success.css'

export default function CheckoutSuccessPage() {
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="ui-success">
      <div className="ui-success-grid">
        <div className="ui-success-content">
          <h1 className="ui-success-title">Order confirmed!</h1>
          <p className="ui-success-subtitle">Your gifts are on their way.</p>

          <Link className="ui-btn-primary ui-success-btn" to="/">
            Back to shop
          </Link>
        </div>

        <div className="ui-success-art" aria-hidden="true">
          <img className="ui-success-stars" src="/assets/images/stars.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
