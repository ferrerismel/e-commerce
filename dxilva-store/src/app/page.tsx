import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Package, Truck, Shield, Headphones } from 'lucide-react';

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8);

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] bg-dxilva-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-dxilva-black via-dxilva-black/80 to-transparent z-10" />
          <Image
            src="/hero-banner.jpg"
            alt="D'XILVA Store Hero"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl animate-slide-up">
              <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold text-dxilva-white mb-6">
                Bienvenido a <span className="text-dxilva-yellow">D'XILVA</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Descubre productos exclusivos con la mejor calidad. Tecnología, moda y más en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/catalogo" className="btn-primary">
                  Ver Catálogo
                </Link>
                <Link href="/ofertas" className="btn-outline border-white text-white hover:bg-white hover:text-dxilva-black">
                  Ver Ofertas
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Package className="w-8 h-8 text-dxilva-yellow" />}
                title="Productos de Calidad"
                description="Selección premium de los mejores productos"
              />
              <FeatureCard
                icon={<Truck className="w-8 h-8 text-dxilva-yellow" />}
                title="Envío Rápido"
                description="Entrega en 24-48 horas hábiles"
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-dxilva-yellow" />}
                title="Pago Seguro"
                description="Múltiples métodos de pago protegidos"
              />
              <FeatureCard
                icon={<Headphones className="w-8 h-8 text-dxilva-yellow" />}
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
              <h2 className="section-title text-center mb-12">Categorías Populares</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/catalogo?category=${category.slug}`}
                    className="group card p-6 text-center hover:border-dxilva-yellow transition-colors"
                  >
                    <h3 className="font-cinzel font-semibold text-dxilva-black dark:text-dxilva-white group-hover:text-dxilva-yellow transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        {featuredProducts && featuredProducts.length > 0 && (
          <section className="py-16 md:py-24 bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductGrid 
                products={featuredProducts} 
                title="Productos Destacados"
                columns={4}
              />
              <div className="mt-12 text-center">
                <Link href="/catalogo" className="btn-primary inline-block">
                  Ver Todos los Productos
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-dxilva-black text-dxilva-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Únete a miles de clientes satisfechos y descubre la mejor experiencia de compra online.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="btn-primary">
                Crear Cuenta
              </Link>
              <Link href="/contacto" className="btn-outline border-dxilva-white text-dxilva-white hover:bg-dxilva-white hover:text-dxilva-black">
                Contactar
              </Link>
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
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="font-cinzel font-semibold text-lg mb-2 text-dxilva-black dark:text-dxilva-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}
