import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/error-state'
import LoadingState from '../components/loading-state'
import { getProductById } from '../services/online-shop-api'
import { addToCart } from '../store/cart-store'
import { showToast } from '../ui/ui-toast/ui-toast-store'
import type { product } from '../types/product'
import '../ui/ui-product-detail.css'

function clampRating(value: number) {
  if (Number.isNaN(value)) return 0
  return Math.max(0, Math.min(5, value))
}

function renderStars(rating: number) {
  const filled = Math.round(clampRating(rating))
  const stars = '★★★★★'
  return `${stars.slice(0, filled)}${'☆☆☆☆☆'.slice(0, 5 - filled)}`
}

export default function ProductPage() {
  const { id } = useParams()
  const [item, setItem] = useState<product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function loadProduct(productId: string) {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const data = await getProductById(productId)
      setItem(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    void loadProduct(id)
  }, [id])

  const isDiscounted = item ? item.discountedPrice < item.price : false
  const discountPercent = useMemo(() => {
    if (!item) return 0
    if (item.discountedPrice >= item.price) return 0
    return Math.round(((item.price - item.discountedPrice) / item.price) * 100)
  }, [item])

  const reviewCount = item?.reviews?.length ?? 0
  const rating = clampRating(item?.rating ?? 0)

  function handleAddToCart() {
    if (!item) return
    addToCart(item)
    showToast('Added to cart', 'success')
  }

  if (!id) return <ErrorState message="Missing product id." />
  if (isLoading) return <LoadingState />
  if (errorMessage) return <ErrorState message={errorMessage} onRetry={() => loadProduct(id)} />
  if (!item) return <ErrorState message="Product not found." />

  return (
    <div>
      <Link to="/" className="ui-back-link">
        ← Back to shop
      </Link>

      <div className="ui-product-detail">
        <div className="ui-product-media">
          <img src={item.image?.url} alt={item.image?.alt || item.title} />
          {isDiscounted ? <span className="ui-product-discount">-{discountPercent}%</span> : null}
        </div>

        <div>
          <h1 className="ui-product-title">{item.title}</h1>

          <div className="ui-product-meta">
            <span className="ui-stars" aria-label={`Rating ${rating} out of 5`}>
              {renderStars(rating)}
            </span>
            <span className="fw-semibold">
              {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          {item.tags?.length ? (
            <div className="ui-tags" aria-label="Tags">
              {item.tags.map((tag) => (
                <span className="ui-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="ui-price-row">
            {isDiscounted ? (
              <>
                <span className="ui-price-new">{item.discountedPrice}</span>
                <span className="ui-price-old">{item.price}</span>
              </>
            ) : (
              <span className="ui-price-new">{item.price}</span>
            )}
          </div>

          <p className="ui-product-desc">{item.description}</p>

          <div className="ui-product-actions">
            <button className="ui-btn-primary" type="button" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="ui-section-divider" />

      <h2 className="ui-reviews-title">Reviews</h2>

      {item.reviews?.length ? (
        <div className="ui-reviews-grid">
          {item.reviews.map((review) => {
            const r = clampRating(review.rating)
            return (
              <div className="ui-review-card" key={review.id}>
                <div className="ui-review-head">
                  <div className="ui-review-name">{review.username}</div>
                  <div className="ui-stars" aria-label={`Review rating ${r} out of 5`}>
                    {renderStars(r)}
                  </div>
                </div>
                <p className="ui-review-body">{review.description}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-muted">No reviews yet.</p>
      )}
    </div>
  )
}
