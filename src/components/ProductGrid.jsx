import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  favorites,
  onToggleFavorite,
  onOpenProduct,
}) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onOpenProduct={onOpenProduct}
          eager={index < 6}
        />
      ))}
    </div>
  )
}
