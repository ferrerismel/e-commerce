import Link from 'next/link';
import { Package, TrendingUp, DollarSign, Users } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: 'package' | 'trending' | 'dollar' | 'users';
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const icons = {
    package: Package,
    trending: TrendingUp,
    dollar: DollarSign,
    users: Users,
  };

  const Icon = icons[icon];
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-dxilva-black dark:text-dxilva-white mt-1">
            {value}
          </p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-gray-500'}`}>
              {isPositive ? '↑' : isNegative ? '↓' : '→'} {Math.abs(change)}% vs mes anterior
            </p>
          )}
        </div>
        <div className="p-3 bg-dxilva-yellow/10 rounded-lg">
          <Icon className="w-6 h-6 text-dxilva-yellow" />
        </div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  stats: {
    totalProducts?: number;
    totalOrders?: number;
    totalRevenue?: number;
    totalCustomers?: number;
    revenueChange?: number;
    ordersChange?: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Productos Totales"
        value={stats.totalProducts || 0}
        icon="package"
      />
      <StatsCard
        title="Órdenes Totales"
        value={stats.totalOrders || 0}
        change={stats.ordersChange}
        icon="trending"
      />
      <StatsCard
        title="Ingresos Totales"
        value={`$${(stats.totalRevenue || 0).toLocaleString()}`}
        change={stats.revenueChange}
        icon="dollar"
      />
      <StatsCard
        title="Clientes Totales"
        value={stats.totalCustomers || 0}
        icon="users"
      />
    </div>
  );
}
