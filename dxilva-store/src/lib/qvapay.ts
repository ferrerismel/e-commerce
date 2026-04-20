import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * QvaPay Payment Integration
 * 
 * This server action creates a payment invoice with QvaPay
 * and returns the payment URL for redirection.
 */

interface CreateQvaPayInvoiceParams {
  orderId: string;
  amount: number;
  currency: string;
  description: string;
  customerEmail?: string;
}

interface QvaPayInvoiceResponse {
  success: boolean;
  invoice_url?: string;
  invoice_id?: string;
  payment_uuid?: string;
  error?: string;
}

export async function createQvaPayInvoice({
  orderId,
  amount,
  currency,
  description,
  customerEmail,
}: CreateQvaPayInvoiceParams): Promise<QvaPayInvoiceResponse> {
  try {
    const appId = process.env.QVAPAY_APP_ID;
    const secretKey = process.env.QVAPAY_SECRET_KEY;
    
    if (!appId || !secretKey) {
      throw new Error('QvaPay credentials not configured');
    }
    
    // Create invoice payload
    const payload = {
      app_id: appId,
      amount: amount.toString(),
      currency: currency || 'USD',
      description: description,
      order_id: orderId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/qvapay`,
      customer_email: customerEmail,
    };
    
    // Make request to QvaPay API
    const response = await fetch('https://qvapay.com/api/v1/create_invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create QvaPay invoice');
    }
    
    const data = await response.json();
    
    // Update order with QvaPay invoice ID
    const supabase = await createClient();
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        qvapay_invoice_id: data.invoice_id,
        metadata: {
          qvapay_created_at: new Date().toISOString(),
          qvapay_amount: amount,
          qvapay_currency: currency,
        },
      })
      .eq('id', orderId);
    
    if (updateError) {
      console.error('Error updating order with QvaPay invoice ID:', updateError);
    }
    
    return {
      success: true,
      invoice_url: data.invoice_url,
      invoice_id: data.invoice_id,
      payment_uuid: data.payment_uuid,
    };
    
  } catch (error) {
    console.error('QvaPay invoice creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create invoice',
    };
  }
}

/**
 * Check QvaPay payment status
 */
export async function checkQvaPayPaymentStatus(
  paymentUuid: string
): Promise<{
  status: string;
  amount?: number;
  currency?: string;
  paid_at?: string;
} | null> {
  try {
    const secretKey = process.env.QVAPAY_SECRET_KEY;
    
    if (!secretKey) {
      throw new Error('QvaPay credentials not configured');
    }
    
    const response = await fetch(
      `https://qvapay.com/api/v1/payment_status?payment_uuid=${paymentUuid}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }
    
    const data = await response.json();
    
    return {
      status: data.status,
      amount: parseFloat(data.amount),
      currency: data.currency,
      paid_at: data.paid_at,
    };
    
  } catch (error) {
    console.error('Error checking QvaPay payment status:', error);
    return null;
  }
}

/**
 * Generate QvaPay payment button HTML
 * For embedded payment buttons on your site
 */
export function generateQvaPayButtonHtml({
  amount,
  currency = 'USD',
  description,
  orderId,
}: {
  amount: number;
  currency?: string;
  description: string;
  orderId: string;
}): string {
  const appId = process.env.QVAPAY_APP_ID;
  
  if (!appId) {
    return '<!-- QvaPay App ID not configured -->';
  }
  
  return `
    <div 
      class="qvapay-payment-button"
      data-app-id="${appId}"
      data-amount="${amount}"
      data-currency="${currency}"
      data-description="${description}"
      data-order-id="${orderId}"
      data-success-url="${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order=${orderId}"
      data-cancel-url="${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel"
      data-webhook-url="${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/qvapay"
    >
    </div>
    <script src="https://qvapay.com/assets/js/qvapay.js"></script>
  `;
}
