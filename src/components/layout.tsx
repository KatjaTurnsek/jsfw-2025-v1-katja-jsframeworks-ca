import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getCartCount, onCartChanged } from '../store/cart-store'
import UiToast from '../ui/ui-toast/ui-toast'
import '../ui/ui-layout.css'

export default function Layout() {
  const [cartCount, setCartCount] = useState(getCartCount())

  useEffect(() => {
    return onCartChanged(() => {
      setCartCount(getCartCount())
    })
  }, [])

  return (
    <div className="ui-site ui-page">
      <div className="ui-top-wrap">
        <header className="ui-header bg-transparent">
          <nav className="ui-navbar">
            <div className="container ui-header-grid">
              {/* Brand */}
              <NavLink className="ui-brand" to="/" aria-label="Little Joy home">
                <img
                  className="ui-brand-logo"
                  src="/assets/images/little-joy-logotype.svg"
                  alt="Little Joy"
                />
              </NavLink>

              {/* Desktop menu (inside header) */}
              <div className="ui-nav-center ui-nav-desktop" aria-label="Main navigation">
                <NavLink className="ui-nav-link" to="/">
                  Home
                </NavLink>

                <span className="ui-nav-divider" aria-hidden="true" />

                <NavLink className="ui-nav-link" to="/contact">
                  Contact
                </NavLink>
              </div>

              {/* Cart */}
              <NavLink className="ui-cart" to="/cart" aria-label="Cart">
                <span className="ui-cart-icon" aria-hidden="true">
                  <img src="/assets/images/cart-icon.svg" alt="" />
                </span>

                {cartCount > 0 ? <span className="ui-cart-count">{cartCount}</span> : null}
              </NavLink>
            </div>
          </nav>
        </header>

        <section className="ui-hero ui-illustration-full" aria-hidden="true">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/assets/images/mobile-header-illustration.svg"
            />
            <img
              className="ui-hero-illustration"
              src="/assets/images/desktop-header-illustration.svg"
              alt=""
            />
          </picture>
        </section>

        {/* Mobile menu (below hero) */}
        <div className="ui-nav-mobile-wrap">
          <div className="container">
            <div className="ui-nav-center ui-nav-mobile" aria-label="Main navigation">
              <NavLink className="ui-nav-link" to="/">
                Home
              </NavLink>

              <span className="ui-nav-divider" aria-hidden="true" />

              <NavLink className="ui-nav-link" to="/contact">
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <main className="ui-main">
        <Outlet />
      </main>

      <footer className="ui-footer">
        <div className="ui-illustration-full" aria-hidden="true">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/assets/images/mobile-footer-illustration.svg"
            />
            <img
              className="ui-footer-illustration"
              src="/assets/images/desktop-footer-illustration.svg"
              alt=""
            />
          </picture>
        </div>

        <div className="container ui-footer-content">
          <img
            className="ui-footer-logo"
            src="/assets/images/little-joy-logotype.svg"
            alt="Little Joy"
          />

          <div className="ui-footer-tagline">Easy gifts, fast choices</div>

          <div className="ui-footer-divider" />

          <ul className="ui-footer-links">
            <li>
              <NavLink className="ui-link-muted" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="ui-link-muted" to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className="ui-link-muted" to="/cart">
                Cart
              </NavLink>
            </li>
          </ul>

          <div className="ui-footer-bottom">
            This is a demo store built with the Noroff Online Shop API – © 2026 Little Joy
          </div>
        </div>
      </footer>

      <UiToast />
    </div>
  )
}
