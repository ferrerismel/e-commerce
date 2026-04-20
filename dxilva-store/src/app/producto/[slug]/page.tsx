import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { formatPrice, getSupabaseImageUrl } from '@/lib/utils';

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  // Fetch product by slug
  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', product.category_id)
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(4);

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-dxilva-yellow transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al catálogo
            </Link>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white dark:bg-dxilva-gray-dark rounded-lg overflow-hidden">
                {product.thumbnail_url ? (
                  <Image
                    src={getSupabaseImageUrl(product.thumbnail_url, { width: 800, height: 800 }) || product.thumbnail_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
                    <span className="text-sm">Sin imagen disponible</span>
                  </div>
                )}
                {hasDiscount && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.categories && (
                <p className="text-sm text-dxilva-yellow font-medium uppercase tracking-wide">
                  {product.categories.name || 'Producto'}
                </p>
              )}

              {/* Title */}
              <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold text-dxilva-black dark:text-dxilva-white">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-dxilva-yellow">
                  {formatPrice(product.price, { currency: product.currency })}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.compare_price!, { currency: product.currency })}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description || 'Sin descripción disponible.'}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock_quantity > 0 ? (
                  <span className="text-green-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    En stock ({product.stock_quantity} unidades)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Agotado</span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4 pt-4">
                <button
                  disabled={product.stock_quantity === 0}
                  className="flex-1 btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Añadir al Carrito
                </button>
                <button className="p-4 border-2 border-dxilva-gray-dark rounded-lg hover:border-dxilva-yellow transition-colors">
                  <Heart className="w-6 h-6 text-dxilva-black dark:text-dxilva-white" />
                </button>
              </div>

              {/* Features */}
              <div className="pt-6 border-t border-dxilva-gray-light dark:border-dxilva-gray-dark space-y-4">
                <FeatureItem
                  icon={<Truck className="w-5 h-5 text-dxilva-yellow" />}
                  text="Envío gratis en pedidos superiores a $50"
                />
                <FeatureItem
                  icon={<Shield className="w-5 h-5 text-dxilva-yellow" />}
                  text="Garantía de calidad asegurada"
                />
                <FeatureItem
                  icon={<RotateCcw className="w-5 h-5 text-dxilva-yellow" />}
                  text="Devoluciones gratuitas en 30 días"
                />
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <section className="border-t border-dxilva-gray-light dark:border-dxilva-gray-dark pt-16">
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-dxilva-black dark:text-dxilva-white mb-8">
                Productos Relacionados
              </h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  );
}
