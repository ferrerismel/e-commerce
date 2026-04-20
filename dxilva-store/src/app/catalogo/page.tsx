import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Filter } from 'lucide-react';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const supabase = await createClient();
  const category = searchParams.category;
  const searchQuery = searchParams.q;

  // Build query
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true);

  if (category) {
    query = query.eq('category_id', category);
  }

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`);
  }

  const { data: products } = await query.order('created_at', { ascending: false });

  // Fetch categories for filter
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-dxilva-black dark:text-dxilva-white mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explora nuestra selección de productos exclusivos
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-dxilva-black dark:text-dxilva-white">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filtros:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <a
                href="/catalogo"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !category
                    ? 'bg-dxilva-yellow text-dxilva-black'
                    : 'bg-white dark:bg-dxilva-gray-dark text-dxilva-black dark:text-dxilva-white hover:bg-dxilva-yellow/20'
                }`}
              >
                Todos
              </a>
              {categories && categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/catalogo?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat.slug
                      ? 'bg-dxilva-yellow text-dxilva-black'
                      : 'bg-white dark:bg-dxilva-gray-dark text-dxilva-black dark:text-dxilva-white hover:bg-dxilva-yellow/20'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={products || []}
            columns={4}
          />

          {/* Empty State */}
          {(!products || products.length === 0) && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron productos
              </p>
              <a href="/catalogo" className="text-dxilva-yellow hover:underline mt-4 inline-block">
                Ver todos los productos
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
