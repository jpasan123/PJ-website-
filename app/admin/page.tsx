'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface DashboardStats {
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
  ordersByMonth: any[];
  salesByCategory: any[];
  customerGrowth: any[];
  dailyStats: {
    ordersToday: number;
    revenueToday: number;
    customersToday: number;
    ordersGrowth: number;
    revenueGrowth: number;
    customersGrowth: number;
  };
  alerts: {
    type: 'success' | 'warning' | 'error';
    message: string;
    time: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    ordersByMonth: [],
    salesByCategory: [],
    customerGrowth: [],
    dailyStats: {
      ordersToday: 0,
      revenueToday: 0,
      customersToday: 0,
      ordersGrowth: 0,
      revenueGrowth: 0,
      customersGrowth: 0
    },
    alerts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchDashboardStats();
    const interval = setInterval(fetchDashboardStats, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total orders
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      // Fetch total customers
      const { count: customersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .neq('role', 'admin');

      // Fetch total products
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Fetch total revenue
      const { data: revenue } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'completed');

      const totalRevenue = revenue?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Mock data for demonstration - replace with real data in production
      const mockDailyStats = {
        ordersToday: 25,
        revenueToday: 5000,
        customersToday: 15,
        ordersGrowth: 12.5,
        revenueGrowth: 15.2,
        customersGrowth: 8.7
      };

      const mockAlerts = [
        {
          type: 'success' as const,
          message: 'Daily backup completed successfully',
          time: '2 minutes ago'
        },
        {
          type: 'warning' as const,
          message: 'Stock running low for "Business Laptop Pro"',
          time: '15 minutes ago'
        },
        {
          type: 'error' as const,
          message: 'Payment processing error for Order #1234',
          time: '1 hour ago'
        }
      ];

      const ordersByMonth = [
        { month: 'Jan', orders: 65, revenue: 12500 },
        { month: 'Feb', orders: 59, revenue: 11000 },
        { month: 'Mar', orders: 80, revenue: 15000 },
        { month: 'Apr', orders: 81, revenue: 15500 },
        { month: 'May', orders: 56, revenue: 10500 },
        { month: 'Jun', orders: 55, revenue: 10000 },
        { month: 'Jul', orders: 40, revenue: 8000 }
      ];

      const salesByCategory = [
        { name: 'Electronics', value: 400, growth: 15 },
        { name: 'Furniture', value: 300, growth: 10 },
        { name: 'Office', value: 300, growth: 5 },
        { name: 'Security', value: 200, growth: 20 }
      ];

      const customerGrowth = [
        { month: 'Jan', customers: 400, active: 380 },
        { month: 'Feb', customers: 600, active: 550 },
        { month: 'Mar', customers: 800, active: 720 },
        { month: 'Apr', customers: 1000, active: 900 },
        { month: 'May', customers: 1200, active: 1050 },
        { month: 'Jun', customers: 1500, active: 1300 },
        { month: 'Jul', customers: 1800, active: 1600 }
      ];

      setStats({
        totalOrders: ordersCount || 0,
        totalCustomers: customersCount || 0,
        totalProducts: productsCount || 0,
        totalRevenue,
        recentOrders: [],
        topProducts: [],
        ordersByMonth,
        salesByCategory,
        customerGrowth,
        dailyStats: mockDailyStats,
        alerts: mockAlerts
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Updates
            </Button>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-4">
            {stats.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  alert.type === 'success' ? 'bg-green-50 text-green-700' :
                  alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {alert.type === 'success' ? <CheckCircle className="h-5 w-5" /> :
                   alert.type === 'warning' ? <AlertTriangle className="h-5 w-5" /> :
                   <XCircle className="h-5 w-5" />}
                  <span>{alert.message}</span>
                </div>
                <span className="text-sm opacity-75">{alert.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-80">
                Today's Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.dailyStats.ordersToday}</div>
              <div className="flex items-center text-sm mt-2">
                {stats.dailyStats.ordersGrowth >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(stats.dailyStats.ordersGrowth)}% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-80">
                Today's Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.dailyStats.revenueToday.toLocaleString()}
              </div>
              <div className="flex items-center text-sm mt-2">
                {stats.dailyStats.revenueGrowth >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(stats.dailyStats.revenueGrowth)}% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-80">
                New Customers Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.dailyStats.customersToday}</div>
              <div className="flex items-center text-sm mt-2">
                {stats.dailyStats.customersGrowth >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(stats.dailyStats.customersGrowth)}% from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <div className="flex items-center text-sm text-green-500 mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <div className="flex items-center text-sm text-green-500 mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                8% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <div className="flex items-center text-sm text-red-500 mt-2">
                <ArrowDown className="h-4 w-4 mr-1" />
                3% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toFixed(2)}
              </div>
              <div className="flex items-center text-sm text-green-500 mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                15% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Revenue Trend
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Last 7 Days
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.ordersByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Customer Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Customer Growth
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.customerGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#ffc658"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.salesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {stats.salesByCategory.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{category.growth}%</span>
                      {category.growth > 0 ? (
                        <ArrowUp className="h-4 w-4 text-green-500 ml-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500 ml-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium">Order #{1000 + index}</p>
                      <p className="text-sm text-gray-500">
                        {index === 0 ? '2 hours ago' : `${index + 1} days ago`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(299.99 * (index + 1)).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        {index === 0 ? 'Pending' : 'Completed'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}