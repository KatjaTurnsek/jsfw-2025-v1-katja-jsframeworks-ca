import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorState from '../components/error-state'
import LoadingState from '../components/loading-state'
import { getProducts } from '../services/online-shop-api'
import type { product } from '../types/product'
import { formatPrice } from '../ui/ui-format'
import '../ui/ui-product-card.css'
import '../ui/ui-search.css'
import '../ui/ui-home.css'

type SortValue = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc'

function getShownPrice(item: product) {
  return item.discountedPrice < item.price ? item.discountedPrice : item.price
}

export default function HomePage() {
  const [products, setProducts] = useState<product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState<SortValue>('featured')

  async function loadProducts() {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  const matches = useMemo(() => {
    const q = searchValue.trim().toLowerCase()
    if (!q) return []

    return products.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8)
  }, [products, searchValue])

  const sortedProducts = useMemo(() => {
    const list = [...products]

    switch (sortValue) {
      case 'price-asc':
        return list.sort((a, b) => getShownPrice(a) - getShownPrice(b))
      case 'price-desc':
        return list.sort((a, b) => getShownPrice(b) - getShownPrice(a))
      case 'rating-desc':
        return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      case 'title-asc':
        return list.sort((a, b) => a.title.localeCompare(b.title))
      case 'featured':
      default:
        return list
    }
  }, [products, sortValue])

  return (
    <div>
      <div className="ui-home-header">
        <div className="ui-home-title-wrap">
          <h1 className="h3 ui-page-title mb-0">Shop</h1>
          <div className="ui-home-subtitle">Browse gifts</div>
        </div>

        <div className="ui-home-search-wrap position-relative">
          <label className="form-label visually-hidden" htmlFor="search">
            Search products
          </label>

          <div className="ui-search">
            <input
              className="ui-search-input"
              id="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              placeholder="Search"
            />

            <button className="ui-search-btn" type="button" aria-label="Search">
              <img src="/assets/images/search-icon.svg" alt="" />
            </button>

            {matches.length ? (
              <div className="ui-search-dropdown" aria-label="Search results">
                {matches.map((item) => {
                  const shownPrice = getShownPrice(item)

                  return (
                    <Link
                      key={item.id}
                      className="ui-search-item"
                      to={`/product/${item.id}`}
                      onClick={() => setSearchValue('')}
                    >
                      <span className="ui-search-thumb" aria-hidden="true">
                        <img src={item.image?.url} alt="" />
                      </span>

                      <span className="ui-search-text">
                        <span className="ui-search-title">{item.title}</span>
                        <span className="ui-search-price">{formatPrice(shownPrice)}</span>
                      </span>

                      <span className="ui-search-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="ui-home-sort-wrap">
          <label className="form-label visually-hidden" htmlFor="sort">
            Sort products
          </label>

          <select
            id="sort"
            className="ui-sort-select"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value as SortValue)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating-desc">Rating: high to low</option>
            <option value="title-asc">Title: A–Z</option>
          </select>
        </div>
      </div>

      {isLoading ? <LoadingState /> : null}
      {errorMessage ? <ErrorState message={errorMessage} onRetry={loadProducts} /> : null}

      {!isLoading && !errorMessage ? (
        <div className="row g-3">
          {sortedProducts.map((item) => {
            const isDiscounted = item.discountedPrice < item.price
            const discountPercent = isDiscounted
              ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
              : 0

            return (
              <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                <div className="card h-100 ui-card ui-card-hover">
                  <div className="ui-card-media">
                    <img
                      src={item.image?.url}
                      alt={item.image?.alt || item.title}
                      className="ui-product-image"
                      loading="lazy"
                    />
                    {isDiscounted ? (
                      <span className="ui-discount-badge">-{discountPercent}%</span>
                    ) : null}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="ui-rating-row">
                      <span className="ui-stars">
                        {'★★★★★'.slice(0, Math.round(item.rating ?? 0))}
                      </span>
                      <span className="ui-rating-count">
                        {item.reviews?.length ? `(${item.reviews.length})` : ''}
                      </span>
                    </div>

                    <div className="ui-card-bottom">
                      <h2 className="ui-product-title">{item.title}</h2>

                      <div className="ui-price-row">
                        {isDiscounted ? (
                          <>
                            <span className="ui-price-new">
                              {formatPrice(item.discountedPrice)}
                            </span>
                            <span className="ui-price-old">{formatPrice(item.price)}</span>
                          </>
                        ) : (
                          <span className="ui-price-new">{formatPrice(item.price)}</span>
                        )}
                      </div>
                    </div>

                    <Link className="ui-btn-accent ui-btn-bottom" to={`/product/${item.id}`}>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
