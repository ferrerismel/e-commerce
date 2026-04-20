import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import crypto from 'crypto';

/**
 * QvaPay Webhook Handler
 * 
 * This endpoint receives payment notifications from QvaPay
 * and updates the order status accordingly.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook signature (if QvaPay provides one)
    const signature = request.headers.get('x-qvapay-signature');
    const webhookSecret = process.env.QVAPAY_WEBHOOK_SECRET;
    
    // Optional: Verify signature if provided by QvaPay
    // if (signature && webhookSecret) {
    //   const expectedSignature = crypto
    //     .createHmac('sha256', webhookSecret)
    //     .update(JSON.stringify(body))
    //     .digest('hex');
    //   
    //   if (signature !== expectedSignature) {
    //     return NextResponse.json(
    //       { error: 'Invalid signature' },
    //       { status: 401 }
    //     );
    //   }
    // }
    
    const supabase = createAdminClient();
    
    // Extract payment data from QvaPay webhook
    const { 
      payment_uuid, 
      invoice_id, 
      status, 
      amount, 
      currency,
      app_id 
    } = body;
    
    // Validate required fields
    if (!payment_uuid || !invoice_id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Find the order by QvaPay invoice ID
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('qvapay_invoice_id', invoice_id)
      .single();
    
    if (fetchError || !order) {
      console.error('Order not found for invoice:', invoice_id);
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update order based on payment status
    let orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' = 'pending';
    let paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' = 'pending';
    let paidAt: string | null = null;
    
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
      case 'success':
        orderStatus = 'confirmed';
        paymentStatus = 'paid';
        paidAt = new Date().toISOString();
        break;
        
      case 'failed':
      case 'cancelled':
      case 'rejected':
        orderStatus = 'cancelled';
        paymentStatus = 'failed';
        break;
        
      case 'refunded':
        orderStatus = 'refunded';
        paymentStatus = 'refunded';
        break;
        
      default:
        orderStatus = 'pending';
        paymentStatus = 'pending';
    }
    
    // Update the order
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: orderStatus,
        payment_status: paymentStatus,
        qvapay_payment_uuid: payment_uuid,
        paid_at: paidAt,
        metadata: {
          ...order.metadata,
          qvapay_webhook_received_at: new Date().toISOString(),
          qvapay_webhook_data: body,
        },
      })
      .eq('id', order.id);
    
    if (updateError) {
      console.error('Error updating order:', updateError);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }
    
    // If payment was successful, you can trigger additional actions here:
    // - Send confirmation email
    // - Update inventory
    // - Notify seller
    // - Add to analytics
    
    if (paymentStatus === 'paid') {
      // Example: Send confirmation email (implement separately)
      // await sendOrderConfirmationEmail(order.id);
      
      // Example: Update inventory
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', order.id);
      
      if (orderItems) {
        for (const item of orderItems) {
          if (item.product_id) {
            await supabase.rpc('decrement_stock', {
              product_id: item.product_id,
              quantity: item.quantity,
            });
          }
        }
      }
    }
    
    console.log(`Order ${order.order_number} updated: ${paymentStatus}`);
    
    return NextResponse.json({
      success: true,
      order_id: order.id,
      order_number: order.order_number,
      status: paymentStatus,
    });
    
  } catch (error) {
    console.error('QvaPay webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing/debugging)
export async function GET() {
  return NextResponse.json({
    message: 'QvaPay webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}
