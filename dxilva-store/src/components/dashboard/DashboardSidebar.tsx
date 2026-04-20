'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  BarChart3,
  Tag,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  role: 'admin' | 'seller';
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const adminLinks = [
    { href: '/dashboard/admin', label: 'Panel', icon: LayoutDashboard },
    { href: '/dashboard/admin/products', label: 'Productos', icon: Package },
    { href: '/dashboard/admin/orders', label: 'Órdenes', icon: ShoppingCart },
    { href: '/dashboard/admin/categories', label: 'Categorías', icon: Tag },
    { href: '/dashboard/admin/users', label: 'Usuarios', icon: Users },
    { href: '/dashboard/admin/analytics', label: 'Estadísticas', icon: BarChart3 },
    { href: '/dashboard/admin/settings', label: 'Configuración', icon: Settings },
  ];

  const sellerLinks = [
    { href: '/dashboard/seller', label: 'Panel', icon: LayoutDashboard },
    { href: '/dashboard/seller/products', label: 'Mis Productos', icon: Package },
    { href: '/dashboard/seller/orders', label: 'Mis Órdenes', icon: ShoppingCart },
    { href: '/dashboard/seller/analytics', label: 'Estadísticas', icon: BarChart3 },
    { href: '/dashboard/seller/settings', label: 'Configuración', icon: Settings },
  ];

  const links = role === 'admin' ? adminLinks : sellerLinks;

  const handleLogout = async () => {
    // Implement logout logic
    console.log('Logout');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dxilva-yellow text-dxilva-black rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-dxilva-black border-r border-gray-800 transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            'flex items-center h-16 md:h-20 px-4 border-b border-gray-800',
            isCollapsed && 'justify-center'
          )}>
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-cinzel text-xl font-bold text-dxilva-yellow">
                {isCollapsed ? "D'X" : "D'XILVA"}
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-dxilva-yellow text-dxilva-black'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-dxilva-white'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium whitespace-nowrap">
                      {link.label}
                    </span>
                  )}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-8 bg-dxilva-yellow rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center w-full px-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors',
                isCollapsed && 'justify-center'
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 font-medium">Cerrar Sesión</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex fixed top-1/2 -right-3 transform -translate-y-1/2 z-50 w-6 h-12 bg-dxilva-yellow text-dxilva-black rounded-r-lg items-center justify-center shadow-lg hover:bg-dxilva-yellow-hover transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '>' : '<'}
      </button>
    </>
  );
}
