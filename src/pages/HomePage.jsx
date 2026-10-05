import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Hero from '../components/Hero'
import CollectionToolbar from '../components/CollectionToolbar'
import CollectionStats from '../components/CollectionStats'
import ProductGrid from '../components/ProductGrid'
import ProductModal from '../components/ProductModal'
import EmptyState from '../components/EmptyState'
import EditorialSection from '../components/EditorialSection'
import SessionActivity from '../components/SessionActivity'
import Footer from '../components/Footer'
import { categories, products } from '../data/products'
import { filterAndSortProducts } from '../utils/filterAndSortProducts'
import { calculateCollectionStats } from '../utils/calculateCollectionStats'

export default function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEditorialExpanded, setIsEditorialExpanded] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    if (location.state?.scrollTo === 'collection') {
      window.requestAnimationFrame(() => {
        document
          .getElementById('collection')
          ?.scrollIntoView({ behavior: 'smooth' })
      })

      navigate('/', { replace: true, state: null })
    }
  }, [location.state, navigate])

  const visibleProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        query,
        category,
        sortBy,
        inStockOnly,
      }),
    [category, inStockOnly, query, sortBy],
  )

  const collectionStats = useMemo(
    () => calculateCollectionStats(visibleProducts, favorites),
    [favorites, visibleProducts],
  )

  const handleToggleFavorite = useCallback((productId, shouldSave) => {
    setFavorites((currentFavorites) => {
      if (shouldSave) {
        return currentFavorites.includes(productId)
          ? currentFavorites
          : [...currentFavorites, productId]
      }

      return currentFavorites.filter((id) => id !== productId)
    })

    const product = products.find((item) => item.id === productId)
    const productName = product?.name ?? 'Item'

    if (shouldSave) {
      toast.success(`${productName} saved to your edit.`)
      return
    }

    toast.info(`${productName} removed from your edit.`)
  }, [])

  const handleOpenProduct = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const handleCloseProduct = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  const handleResetFilters = useCallback(() => {
    setQuery('')
    setCategory('All')
    setSortBy('newest')
    setInStockOnly(false)
    toast.info('Collection filters reset.')
  }, [])

  const handleEditorialToggle = useCallback(() => {
    setIsEditorialExpanded((currentValue) => !currentValue)
  }, [])

  return (
    <>
      <Header
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      <main>
        <Hero />

        <section className="collection-section" id="collection">
          <div className="section-heading">
            <p className="eyebrow">THE COLLECTION</p>

            <h2>
              Iconic pieces
              <span>for a higher standard</span>
            </h2>
          </div>

          <CollectionToolbar
            query={query}
            onQueryChange={setQuery}
            category={category}
            categories={categories}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            onReset={handleResetFilters}
          />

          <CollectionStats stats={collectionStats} />

          {visibleProducts.length > 0 ? (
            <ProductGrid
              products={visibleProducts}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenProduct={handleOpenProduct}
            />
          ) : (
            <EmptyState onReset={handleResetFilters} />
          )}
        </section>

        <EditorialSection
          expanded={isEditorialExpanded}
          onToggle={handleEditorialToggle}
        />

        <SessionActivity />
      </main>

      <Footer
        categories={categories}
        onCategoryChange={setCategory}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={handleCloseProduct}
        />
      )}
    </>
  )
}
