'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice, getSupabaseImageUrl } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-6" />
              <h1 className="font-cinzel text-3xl font-bold text-dxilva-black dark:text-dxilva-white mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Parece que aún no has añadido ningún producto
              </p>
              <Link href="/catalogo" className="btn-primary inline-flex items-center gap-2">
                Ver Catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-dxilva-black dark:text-dxilva-white mb-8">
            Carrito de Compras
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="card p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6"
                >
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-dxilva-gray-light dark:bg-dxilva-gray-dark rounded-lg overflow-hidden">
                    {item.product.thumbnail_url ? (
                      <Image
                        src={getSupabaseImageUrl(item.product.thumbnail_url, { width: 200, height: 200 }) || item.product.thumbnail_url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link
                        href={`/producto/${item.product.slug}`}
                        className="font-medium text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.category_id && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Categoría: {item.product.category_id}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-lg font-bold text-dxilva-yellow">
                      {formatPrice(item.price * item.quantity, { currency: item.product.currency })}
                      {item.quantity > 1 && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({formatPrice(item.price, { currency: item.product.currency })} c/u)
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-dxilva-gray-dark rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-dxilva-gray-light dark:hover:bg-dxilva-gray-dark transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-dxilva-black dark:text-dxilva-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-dxilva-gray-light dark:hover:bg-dxilva-gray-dark transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={() => clearCart()}
                className="text-gray-500 hover:text-red-500 transition-colors text-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Vaciar carrito
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="font-cinzel text-xl font-bold text-dxilva-black dark:text-dxilva-white mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-dxilva-black dark:text-dxilva-white">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-dxilva-black dark:text-dxilva-white">
                    <span>Envío</span>
                    <span className="text-green-500">Gratis</span>
                  </div>
                  <div className="border-t border-dxilva-gray-light dark:border-dxilva-gray-dark pt-4">
                    <div className="flex justify-between text-lg font-bold text-dxilva-black dark:text-dxilva-white">
                      <span>Total</span>
                      <span className="text-dxilva-yellow">{formatPrice(totalPrice())}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-primary mb-4 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? 'Procesando...' : 'Proceder al Pago'}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <Link
                  href="/catalogo"
                  className="w-full btn-outline block text-center"
                >
                  Seguir Comprando
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-dxilva-gray-light dark:border-dxilva-gray-dark">
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>Envío Seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Pago Protegido</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
