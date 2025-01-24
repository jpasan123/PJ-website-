'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/hooks/use-toast';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface AnalyticsData {
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  salesByCategory: { name: string; value: number }[];
  revenueOverTime: { date: string; revenue: number }[];
  topProducts: { name: string; sales: number }[];
  customerAcquisition: { date: string; customers: number }[];
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    revenue: 0,
    orders: 0,
    customers: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    customersGrowth: 0,
    salesByCategory: [],
    revenueOverTime: [],
    topProducts: [],
    customerAcquisition: []
  });

  const { toast } = useToast();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Mock data for demonstration
      const mockData: AnalyticsData = {
        revenue: 125000,
        orders: 450,
        customers: 280,
        averageOrderValue: 277.78,
        revenueGrowth: 15.5,
        ordersGrowth: 8.3,
        customersGrowth: 12.7,
        salesByCategory: [
          { name: 'Electronics', value: 45000 },
          { name: 'Furniture', value: 35000 },
          { name: 'Office', value: 25000 },
          { name: 'Security', value: 20000 }
        ],
        revenueOverTime: [
          { date: 'Jan', revenue: 15000 },
          { date: 'Feb', revenue: 25000 },
          { date: 'Mar', revenue: 35000 },
          { date: 'Apr', revenue: 45000 },
          { date: 'May', revenue: 40000 },
          { date: 'Jun', revenue: 50000 }
        ],
        topProducts: [
          { name: 'Business Laptop Pro', sales: 120 },
          { name: 'Office Desk Premium', sales: 95 },
          { name: 'Security Camera System', sales: 85 },
          { name: 'Ergonomic Chair', sales: 75 },
          { name: 'Wireless Router', sales: 65 }
        ],
        customerAcquisition: [
          { date: 'Jan', customers: 40 },
          { date: 'Feb', customers: 45 },
          { date: 'Mar', customers: 55 },
          { date: 'Apr', customers: 65 },
          { date: 'May', customers: 75 },
          { date: 'Jun', customers: 85 }
        ]
      };

      setData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch analytics data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.revenue.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${data.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'} mt-2`}>
              {data.revenueGrowth >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(data.revenueGrowth)}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.orders.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${data.ordersGrowth >= 0 ? 'text-green-500' : 'text-red-500'} mt-2`}>
              {data.ordersGrowth >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(data.ordersGrowth)}% from last period
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
            <div className="text-2xl font-bold">{data.customers.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${data.customersGrowth >= 0 ? 'text-green-500' : 'text-red-500'} mt-2`}>
              {data.customersGrowth >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(data.customersGrowth)}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.averageOrderValue.toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-2">
              Per order average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Legend />
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

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.salesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="sales" 
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Acquisition */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.customerAcquisition}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}