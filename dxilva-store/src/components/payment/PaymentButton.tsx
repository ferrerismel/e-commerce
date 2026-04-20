'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createQvaPayInvoice } from '@/lib/qvapay';
import { formatPrice } from '@/lib/utils';

interface PaymentButtonProps {
  orderId: string;
  amount: number;
  currency?: string;
  description?: string;
  customerEmail?: string;
  variant?: 'qvapay' | 'transfermovil' | 'enzona' | 'stripe';
}

export default function PaymentButton({
  orderId,
  amount,
  currency = 'USD',
  description = 'Pago de orden',
  customerEmail,
  variant = 'qvapay',
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (variant === 'qvapay') {
        const result = await createQvaPayInvoice({
          orderId,
          amount,
          currency,
          description,
          customerEmail,
        });

        if (result.success && result.invoice_url) {
          // Redirect to QvaPay payment page
          window.location.href = result.invoice_url;
        } else {
          throw new Error(result.error || 'Failed to create invoice');
        }
      } else if (variant === 'transfermovil' || variant === 'enzona') {
        // For Transfermóvil and Enzona, show QR code or payment instructions
        router.push(`/checkout/payment/${variant}?order=${orderId}`);
      } else if (variant === 'stripe') {
        // Stripe integration would go here
        router.push(`/checkout/stripe?order=${orderId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing payment');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    switch (variant) {
      case 'qvapay':
        return 'Pagar con QvaPay';
      case 'transfermovil':
        return 'Pagar con Transfermóvil';
      case 'enzona':
        return 'Pagar con Enzona';
      case 'stripe':
        return 'Pagar con Tarjeta';
      default:
        return 'Proceder al Pago';
    }
  };

  const getButtonColor = () => {
    switch (variant) {
      case 'qvapay':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'transfermovil':
        return 'bg-red-600 hover:bg-red-700';
      case 'enzona':
        return 'bg-green-600 hover:bg-green-700';
      case 'stripe':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-dxilva-yellow hover:bg-dxilva-yellow-hover';
    }
  };

  return (
    <div className="w-full space-y-4">
      <motion.button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full ${getButtonColor()} text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2`}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Procesando...</span>
          </>
        ) : (
          <>
            <span>{getButtonText()}</span>
            <span className="font-bold">{formatPrice(amount, { currency })}</span>
          </>
        )}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Payment Methods Info */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-2">
        <p>🔒 Pago seguro y encriptado</p>
        {variant === 'qvapay' && (
          <p>Serás redirigido a QvaPay para completar tu pago</p>
        )}
        {(variant === 'transfermovil' || variant === 'enzona') && (
          <p>Escanea el código QR con tu aplicación móvil</p>
        )}
      </div>
    </div>
  );
}
