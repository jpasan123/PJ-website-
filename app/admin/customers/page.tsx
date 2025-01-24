'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Download,
  Users,
  UserPlus,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  orders_count: number;
  total_spent: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .neq('role', 'admin')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch order statistics for each customer
      const customersWithStats = await Promise.all(
        (data || []).map(async (customer) => {
          const { data: orders } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('user_id', customer.id);

          const orders_count = orders?.length || 0;
          const total_spent = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

          return {
            ...customer,
            orders_count,
            total_spent
          };
        })
      );

      setCustomers(customersWithStats);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch customers',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Customers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.orders_count > 0).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.reduce((sum, c) => sum + c.total_spent, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">
                          {customer.full_name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{customer.full_name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined {new Date(customer.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        {customer.phone || 'No phone'}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {customer.address || 'No address'}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end justify-between">
                    <div className="space-y-1 text-right">
                      <div className="text-sm text-gray-500">Total Orders</div>
                      <div className="text-2xl font-bold text-primary">{customer.orders_count}</div>
                      <div className="text-sm text-gray-500">
                        Total Spent: ${customer.total_spent.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">Name:</span> {selectedCustomer.full_name}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="text-gray-500">Phone:</span> {selectedCustomer.phone || 'N/A'}</p>
                    <p><span className="text-gray-500">Address:</span> {selectedCustomer.address || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Statistics</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">Total Orders:</span> {selectedCustomer.orders_count}</p>
                    <p><span className="text-gray-500">Total Spent:</span> ${selectedCustomer.total_spent.toFixed(2)}</p>
                    <p><span className="text-gray-500">Average Order Value:</span> ${(selectedCustomer.total_spent / (selectedCustomer.orders_count || 1)).toFixed(2)}</p>
                    <p><span className="text-gray-500">Member Since:</span> {new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}