'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartTotals } from '@/hooks/useCartStore';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCartTotals();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Ofertas', href: '/ofertas' },
    { name: 'Nosotros', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dxilva-white/80 dark:bg-dxilva-black/80 backdrop-blur-md border-b border-dxilva-gray-light dark:border-dxilva-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-dxilva-black dark:text-dxilva-white">
              D'XILVA
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-dxilva-yellow',
                  pathname === item.href
                    ? 'text-dxilva-yellow'
                    : 'text-dxilva-black dark:text-dxilva-white'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:block p-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow transition-colors"
              aria-label="Lista de deseos"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* User Account */}
            <Link
              href="/account"
              className="hidden sm:block p-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow transition-colors"
              aria-label="Mi cuenta"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/carrito"
              className="relative p-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow transition-colors"
              aria-label="Carrito"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-dxilva-yellow text-dxilva-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow transition-colors"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-3 bg-dxilva-gray-light dark:bg-dxilva-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-dxilva-yellow"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-dxilva-gray-light dark:border-dxilva-gray-dark"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block text-base font-medium transition-colors duration-200 hover:text-dxilva-yellow',
                    pathname === item.href
                      ? 'text-dxilva-yellow'
                      : 'text-dxilva-black dark:text-dxilva-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-dxilva-gray-light dark:border-dxilva-gray-dark space-y-4">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow"
                >
                  <User className="w-5 h-5" />
                  <span>Mi Cuenta</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-dxilva-black dark:text-dxilva-white hover:text-dxilva-yellow"
                >
                  <Heart className="w-5 h-5" />
                  <span>Lista de Deseos</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
