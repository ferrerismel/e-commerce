// ==========================================
// DATABASE TYPES FOR SUPABASE
// ==========================================
// These types are auto-generated from your Supabase schema
// Run `npx supabase gen types typescript --project-id your-project-id` to update

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'customer' | 'seller' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'customer' | 'seller' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'customer' | 'seller' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          price: number;
          compare_price: number | null;
          currency: string;
          sku: string | null;
          barcode: string | null;
          stock_quantity: number;
          track_inventory: boolean;
          category_id: string | null;
          seller_id: string | null;
          images: string[];
          thumbnail_url: string | null;
          is_featured: boolean;
          is_active: boolean;
          tags: string[];
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          price: number;
          compare_price?: number | null;
          currency?: string;
          sku?: string | null;
          barcode?: string | null;
          stock_quantity?: number;
          track_inventory?: boolean;
          category_id?: string | null;
          seller_id?: string | null;
          images?: string[];
          thumbnail_url?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          tags?: string[];
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number;
          compare_price?: number | null;
          currency?: string;
          sku?: string | null;
          barcode?: string | null;
          stock_quantity?: number;
          track_inventory?: boolean;
          category_id?: string | null;
          seller_id?: string | null;
          images?: string[];
          thumbnail_url?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          tags?: string[];
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_method: 'qvapay' | 'transfermovil' | 'enzona' | 'stripe' | 'cash' | 'manual';
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id: string | null;
          subtotal: number;
          tax: number;
          shipping_cost: number;
          discount: number;
          total: number;
          currency: string;
          shipping_address: Json | null;
          billing_address: Json | null;
          customer_email: string | null;
          customer_phone: string | null;
          customer_name: string | null;
          notes: string | null;
          metadata: Json;
          qvapay_invoice_id: string | null;
          qvapay_payment_uuid: string | null;
          created_at: string;
          updated_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_method?: 'qvapay' | 'transfermovil' | 'enzona' | 'stripe' | 'cash' | 'manual';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id?: string | null;
          subtotal: number;
          tax?: number;
          shipping_cost?: number;
          discount?: number;
          total: number;
          currency?: string;
          shipping_address?: Json | null;
          billing_address?: Json | null;
          customer_email?: string | null;
          customer_phone?: string | null;
          customer_name?: string | null;
          notes?: string | null;
          metadata?: Json;
          qvapay_invoice_id?: string | null;
          qvapay_payment_uuid?: string | null;
          created_at?: string;
          updated_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_method?: 'qvapay' | 'transfermovil' | 'enzona' | 'stripe' | 'cash' | 'manual';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id?: string | null;
          subtotal?: number;
          tax?: number;
          shipping_cost?: number;
          discount?: number;
          total?: number;
          currency?: string;
          shipping_address?: Json | null;
          billing_address?: Json | null;
          customer_email?: string | null;
          customer_phone?: string | null;
          customer_name?: string | null;
          notes?: string | null;
          metadata?: Json;
          qvapay_invoice_id?: string | null;
          qvapay_payment_uuid?: string | null;
          created_at?: string;
          updated_at?: string;
          paid_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          product_sku: string | null;
          quantity: number;
          price: number;
          subtotal: number;
          metadata: Json;
          created_at: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          quantity: number;
          price: number;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          title: string | null;
          comment: string | null;
          is_verified: boolean;
          is_approved: boolean;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          min_purchase: number;
          max_discount: number | null;
          usage_limit: number | null;
          usage_count: number;
          valid_from: string | null;
          valid_until: string | null;
          is_active: boolean;
          applicable_categories: string[];
          applicable_products: string[];
          created_at: string;
          updated_at: string;
        };
      };
    };
    Views: {
      product_stats: {
        Row: {
          id: string;
          name: string;
          slug: string;
          total_sales: number;
          total_quantity_sold: number;
          total_revenue: number;
          review_count: number;
          average_rating: number;
        };
      };
      sales_analytics: {
        Row: {
          sale_date: string;
          total_orders: number;
          total_revenue: number;
          average_order_value: number;
          unique_customers: number;
        };
      };
    };
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type CartItem = Database['public']['Tables']['cart_items']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Coupon = Database['public']['Tables']['coupons']['Row'];

// Input types for forms
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
