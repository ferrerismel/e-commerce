import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types/database';
import { formatPrice, getSupabaseImageUrl } from '@/lib/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/producto/${product.slug}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-dxilva-gray-light dark:bg-dxilva-gray-dark">
          {product.thumbnail_url ? (
            <Image
              src={getSupabaseImageUrl(product.thumbnail_url, { width: 400, height: 400 }) || product.thumbnail_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {product.is_featured && (
              <span className="bg-dxilva-yellow text-dxilva-black text-xs font-bold px-2 py-1 rounded">
                Destacado
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                Agotado
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-black/80 text-gray-700 dark:text-gray-300 hover:bg-dxilva-yellow hover:text-dxilva-black'
            }`}
            aria-label="Añadir a favoritos"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add to Cart (shown on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered && !isOutOfStock ? 1 : 0,
              y: isHovered && !isOutOfStock ? 0 : 10,
            }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <button
              disabled={isOutOfStock}
              className="w-full btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {product.category_id || 'General'}
          </p>

          {/* Product Name */}
          <h3 className="font-medium text-dxilva-black dark:text-dxilva-white line-clamp-2 group-hover:text-dxilva-yellow transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-dxilva-black dark:text-dxilva-white">
              {formatPrice(product.price, { currency: product.currency })}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.compare_price!, { currency: product.currency })}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          {!isOutOfStock && product.track_inventory && product.stock_quantity < 10 && (
            <p className="text-xs text-orange-500">
              ¡Solo quedan {product.stock_quantity} unidades!
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
