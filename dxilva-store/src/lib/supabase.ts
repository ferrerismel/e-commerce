import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key (use carefully)
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Helper function to get Supabase URL for image transformations
export const getSupabaseImageUrl = (path: string, options?: { width?: number; height?: number; quality?: number }) => {
  const baseUrl = `${supabaseUrl}/storage/v1/object/public/${path}`;
  if (!options) return baseUrl;
  
  const params = new URLSearchParams();
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());
  
  return `${baseUrl}?${params.toString()}`;
};

// Storage bucket helpers
export const storageBuckets = {
  products: 'products',
  avatars: 'avatars',
  banners: 'banners',
} as const;
