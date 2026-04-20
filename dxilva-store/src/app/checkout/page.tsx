'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Smartphone, Building, Globe } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PaymentButton from '@/components/payment/PaymentButton';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<'qvapay' | 'transfermovil' | 'enzona' | 'stripe'>('qvapay');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'qvapay',
      name: 'QvaPay',
      description: 'Pago con tarjeta o transferencia',
      icon: CreditCard,
      color: 'bg-blue-500',
    },
    {
      id: 'transfermovil',
      name: 'Transfermóvil',
      description: 'Bancos cubanos',
      icon: Smartphone,
      color: 'bg-green-500',
    },
    {
      id: 'enzona',
      name: 'Enzona',
      description: 'Billetera digital',
      icon: Building,
      color: 'bg-purple-500',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Tarjetas internacionales',
      icon: Globe,
      color: 'bg-indigo-500',
    },
  ];

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      window.location.href = '/checkout/success';
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="font-cinzel text-3xl font-bold text-dxilva-black dark:text-dxilva-white mb-4">
                Carrito vacío
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Añade productos antes de proceder al pago
              </p>
              <Link href="/catalogo" className="btn-primary">
                Ver Catálogo
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/carrito"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-dxilva-yellow transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al carrito
            </Link>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-dxilva-black dark:text-dxilva-white">
              Finalizar Compra
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="card p-6">
                <h2 className="font-cinzel text-xl font-bold text-dxilva-black dark:text-dxilva-white mb-6">
                  Información del Cliente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dxilva-black dark:text-dxilva-white mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark border border-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dxilva-black dark:text-dxilva-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark border border-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dxilva-black dark:text-dxilva-white mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark border border-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow"
                      placeholder="+53 5XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card p-6">
                <h2 className="font-cinzel text-xl font-bold text-dxilva-black dark:text-dxilva-white mb-6">
                  Dirección de Envío
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dxilva-black dark:text-dxilva-white mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark border border-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow"
                      placeholder="Calle, número, entre calles"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dxilva-black dark:text-dxilva-white mb-2">
                      Provincia
                    </label>
                    <select className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark border border-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow">
                      <option>Seleccionar provincia</option>
                      <option>Pinar del Río</option>
                      <option>La Habana</option>
                      <option>Artemisa</option>
                      <option>Mayabeque</option>
                      <option>Matanzas</option>
                      <option>Cienfuegos</option>
                      <option>Villa Clara</option>
                      <option>Sancti Spíritus</option>
                      <option>Ciego de Ávila</option>
                      <option>Camagüey</option>
                      <option>Las Tunas</option>
                      <option>Holguín</option>
                      <option>Granma</option>
                      <option>Santiago de Cuba</option>
                      <option>Guantánamo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dxilva-black dark:text-dxilva-white mb-2">
                      Municipio
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark border border-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow"
                      placeholder="Municipio"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <h2 className="font-cinzel text-xl font-bold text-dxilva-black dark:text-dxilva-white mb-6">
                  Método de Pago
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPayment === method.id
                          ? 'border-dxilva-yellow bg-dxilva-yellow/10'
                          : 'border-dxilva-gray-dark hover:border-dxilva-yellow/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${method.color}`}>
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-dxilva-black dark:text-dxilva-white">
                            {method.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment Button */}
                <PaymentButton
                  method={selectedPayment}
                  amount={totalPrice()}
                  onSuccess={handlePaymentSuccess}
                  disabled={isProcessing}
                />

                {isProcessing && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Procesando pago, por favor espera...
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="font-cinzel text-xl font-bold text-dxilva-black dark:text-dxilva-white mb-6">
                  Resumen del Pedido
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <span className="text-sm font-medium text-dxilva-black dark:text-dxilva-white flex-shrink-0">
                        {item.quantity}x
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex-1 line-clamp-1">
                        {item.product.name}
                      </span>
                      <span className="text-sm font-medium text-dxilva-black dark:text-dxilva-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-dxilva-gray-light dark:border-dxilva-gray-dark pt-4 space-y-3">
                  <div className="flex justify-between text-dxilva-black dark:text-dxilva-white">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-dxilva-black dark:text-dxilva-white">
                    <span>Envío</span>
                    <span className="text-green-500">Gratis</span>
                  </div>
                  <div className="border-t border-dxilva-gray-light dark:border-dxilva-gray-dark pt-3">
                    <div className="flex justify-between text-lg font-bold text-dxilva-black dark:text-dxilva-white">
                      <span>Total</span>
                      <span className="text-dxilva-yellow">{formatPrice(totalPrice())}</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-green-700 dark:text-green-400 text-center">
                    🔒 Pago 100% seguro y encriptado
                  </p>
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
