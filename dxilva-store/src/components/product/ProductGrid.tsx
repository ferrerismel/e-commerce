'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types/database';

interface ProductGridProps {
  products: Product[];
  title?: string;
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({ 
  products, 
  title,
  columns = 3 
}: ProductGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
          No se encontraron productos
        </h3>
        <p className="mt-2 text-gray-400">
          Intenta con otros filtros o categorías
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {title && (
        <div className="mb-8">
          <h2 className="section-title">{title}</h2>
        </div>
      )}
      
      <div className={`grid ${gridClasses[columns]} gap-6 md:gap-8`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
