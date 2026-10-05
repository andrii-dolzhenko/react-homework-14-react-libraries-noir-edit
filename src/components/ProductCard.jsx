import { memo } from 'react'
import { FaHeart } from 'react-icons/fa6'
import { FiHeart } from 'react-icons/fi'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)

function ProductCardBase({
  product,
  isFavorite,
  onToggleFavorite,
  onOpenProduct,
  eager = false,
}) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <button
          className="product-card__image-button"
          type="button"
          aria-label={`View details for ${product.name}`}
          onClick={() => onOpenProduct(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        </button>

        <button
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Save ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id, !isFavorite)}
        >
          {isFavorite ? (
            <FaHeart aria-hidden="true" />
          ) : (
            <FiHeart aria-hidden="true" />
          )}
        </button>

        {!product.inStock && (
          <span className="sold-out-label">Currently unavailable</span>
        )}
      </div>

      <button
        className="product-card__content"
        type="button"
        onClick={() => onOpenProduct(product)}
      >
        <span>
          <small>{product.category}</small>
          <strong>{product.name}</strong>
          <em>{product.material}</em>
        </span>

        <b>{formatPrice(product.price)}</b>
      </button>
    </article>
  )
}

const ProductCard = memo(ProductCardBase)

export default ProductCard
