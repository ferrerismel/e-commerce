'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CreditCard, Smartphone, Building, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createQvaPayInvoice } from '@/lib/qvapay';
import { formatPrice } from '@/lib/utils';

interface PaymentButtonProps {
  method: 'qvapay' | 'transfermovil' | 'enzona' | 'stripe';
  amount: number;
  onSuccess?: () => void;
  disabled?: boolean;
}

export default function PaymentButton({
  method,
  amount,
  onSuccess,
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (method === 'qvapay') {
        // Generate a temporary order ID
        const orderId = `order_${Date.now()}`;
        
        const result = await createQvaPayInvoice({
          orderId,
          amount,
          currency: 'USD',
          description: 'Pago de compra en D\'XILVA Store',
        });

        if (result.success && result.invoice_url) {
          // Redirect to QvaPay payment page
          window.location.href = result.invoice_url;
        } else {
          throw new Error(result.error || 'Error al crear la factura');
        }
      } else if (method === 'transfermovil' || method === 'enzona') {
        // For Transfermóvil and Enzona, show QR code or payment instructions
        router.push(`/checkout/payment/${method}?amount=${amount}`);
      } else if (method === 'stripe') {
        // Stripe integration would go here
        router.push(`/checkout/stripe?amount=${amount}`);
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error procesando el pago');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonConfig = () => {
    switch (method) {
      case 'qvapay':
        return {
          text: 'Pagar con QvaPay',
          color: 'bg-blue-600 hover:bg-blue-700',
          icon: CreditCard,
        };
      case 'transfermovil':
        return {
          text: 'Pagar con Transfermóvil',
          color: 'bg-red-600 hover:bg-red-700',
          icon: Smartphone,
        };
      case 'enzona':
        return {
          text: 'Pagar con Enzona',
          color: 'bg-green-600 hover:bg-green-700',
          icon: Building,
        };
      case 'stripe':
        return {
          text: 'Pagar con Tarjeta',
          color: 'bg-purple-600 hover:bg-purple-700',
          icon: Globe,
        };
      default:
        return {
          text: 'Proceder al Pago',
          color: 'bg-dxilva-yellow hover:bg-dxilva-yellow-hover',
          icon: CreditCard,
        };
    }
  };

  const config = getButtonConfig();
  const Icon = config.icon;

  return (
    <div className="w-full space-y-4">
      <motion.button
        onClick={handlePayment}
        disabled={isLoading || disabled}
        className={`w-full ${config.color} text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3`}
        whileHover={{ scale: isLoading || disabled ? 1 : 1.02 }}
        whileTap={{ scale: isLoading || disabled ? 1 : 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Procesando...</span>
          </>
        ) : (
          <>
            <Icon className="w-5 h-5" />
            <span>{config.text}</span>
            <span className="font-bold">{formatPrice(amount)}</span>
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
        {method === 'qvapay' && (
          <p>Serás redirigido a QvaPay para completar tu pago</p>
        )}
        {(method === 'transfermovil' || method === 'enzona') && (
          <p>Escanea el código QR con tu aplicación móvil</p>
        )}
        {method === 'stripe' && (
          <p>Tarjetas Visa, Mastercard, American Express</p>
        )}
      </div>
    </div>
  );
}
