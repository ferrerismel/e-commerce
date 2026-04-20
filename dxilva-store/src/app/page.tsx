import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Package, Truck, Shield, Headphones } from 'lucide-react';

// Demo products for fallback when database is not available
const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Auriculares Premium',
    slug: 'auriculares-premium',
    description: 'Auriculares inalámbricos con cancelación de ruido activa. Calidad de sonido excepcional.',
    short_description: 'Auriculares inalámbricos premium',
    price: 89.99,
    compare_price: 129.99,
    currency: 'USD',
    stock_quantity: 50,
    track_inventory: true,
    sku: 'AUD-001',
    barcode: null,
    category_id: null,
    seller_id: null,
    images: [],
    thumbnail_url: null,
    is_featured: true,
    is_active: true,
    tags: ['audio', 'wireless'],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Smartwatch Deportivo',
    slug: 'smartwatch-deportivo',
    description: 'Reloj inteligente con GPS integrado, monitor cardíaco y seguimiento de actividades.',
    short_description: 'Smartwatch con GPS',
    price: 149.99,
    compare_price: 199.99,
    currency: 'USD',
    stock_quantity: 30,
    track_inventory: true,
    sku: 'SMT-002',
    barcode: null,
    category_id: null,
    seller_id: null,
    images: [],
    thumbnail_url: null,
    is_featured: true,
    is_active: true,
    tags: ['wearable', 'sports'],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cámara 4K Pro',
    slug: 'camara-4k-pro',
    description: 'Cámara profesional con grabación 4K, estabilización óptica y modo nocturno.',
    short_description: 'Cámara profesional 4K',
    price: 599.99,
    compare_price: 799.99,
    currency: 'USD',
    stock_quantity: 15,
    track_inventory: true,
    sku: 'CAM-003',
    barcode: null,
    category_id: null,
    seller_id: null,
    images: [],
    thumbnail_url: null,
    is_featured: true,
    is_active: true,
    tags: ['camera', 'professional'],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Teclado Mecánico RGB',
    slug: 'teclado-mecanico-rgb',
    description: 'Teclado gaming con switches mecánicos Cherry MX, iluminación RGB personalizable.',
    short_description: 'Teclado gaming mecánico',
    price: 79.99,
    compare_price: 99.99,
    currency: 'USD',
    stock_quantity: 100,
    track_inventory: true,
    sku: 'TEC-004',
    barcode: null,
    category_id: null,
    seller_id: null,
    images: [],
    thumbnail_url: null,
    is_featured: true,
    is_active: true,
    tags: ['gaming', 'keyboard'],
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function HomePage() {
  let featuredProducts = DEMO_PRODUCTS;
  let categories: any[] = [];
  
  try {
    const supabase = await createClient();
    
    // Fetch featured products
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(8);
    
    if (!productsError && productsData && productsData.length > 0) {
      featuredProducts = productsData;
    }
    
    // Fetch categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (!categoriesError && categoriesData) {
      categories = categoriesData;
    }
  } catch (error) {
    console.log('Using demo data - Database connection not available');
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #F7BB3C 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl animate-slide-up">
              <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Bienvenido a <span className="text-[#F7BB3C]">D&apos;XILVA</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Descubre productos exclusivos con la mejor calidad. Tecnología, moda y más en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/catalogo" className="inline-flex items-center justify-center px-8 py-4 bg-[#F7BB3C] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
                  Ver Catálogo
                </a>
                <a href="/catalogo?featured=true" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                  Ver Ofertas
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Package className="w-8 h-8 text-[#F7BB3C]" />}
                title="Productos de Calidad"
                description="Selección premium de los mejores productos"
              />
              <FeatureCard
                icon={<Truck className="w-8 h-8 text-[#F7BB3C]" />}
                title="Envío Rápido"
                description="Entrega en 24-48 horas hábiles"
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-[#F7BB3C]" />}
                title="Pago Seguro"
                description="Múltiples métodos de pago protegidos"
              />
              <FeatureCard
                icon={<Headphones className="w-8 h-8 text-[#F7BB3C]" />}
                title="Soporte 24/7"
                description="Atención al cliente siempre disponible"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
                Categorías Populares
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/catalogo?category=${category.slug}`}
                    className="group p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:border-[#F7BB3C] border-2 border-transparent transition-all duration-300"
                  >
                    <h3 className="font-cinzel font-semibold text-black dark:text-white group-hover:text-[#F7BB3C] transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        {featuredProducts && featuredProducts.length > 0 && (
          <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductGrid 
                products={featuredProducts} 
                title="Productos Destacados"
                columns={4}
              />
              <div className="mt-12 text-center">
                <a href="/catalogo" className="inline-flex items-center justify-center px-8 py-4 bg-[#F7BB3C] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Ver Todos los Productos
                </a>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Únete a miles de clientes satisfechos y descubre la mejor experiencia de compra online.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/auth/signup" className="inline-flex items-center justify-center px-8 py-4 bg-[#F7BB3C] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300">
                Crear Cuenta
              </a>
              <a href="/about" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                Contactar
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="font-cinzel font-semibold text-lg mb-2 text-black dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}
