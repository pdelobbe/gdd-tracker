import { Layout } from '../components/Layout'
import { ProductCard } from '../components/ProductCard'
import { useProducts } from '../db/hooks'
import { useNavigationStore } from '../stores/useNavigationStore'

export function ProductListScreen() {
  const products = useProducts()
  const navigate = useNavigationStore((s) => s.navigate)

  return (
    <Layout title="PGR Products" showBack>
      <div className="divide-y divide-gray-100">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onTap={() => navigate('productDetail', { productId: product.id })}
          />
        ))}
      </div>
    </Layout>
  )
}
