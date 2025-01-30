'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';

export default function EventsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { label: 'Years of Experience', value: '15+', icon: Award },
    { label: 'Global Customers', value: '10k+', icon: Globe },
    { label: 'Team Members', value: '200+', icon: Users },
    { label: 'Growth Rate', value: '97%', icon: TrendingUp },
  ];

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Registration successful!",
        description: "You have been registered for the event.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our events to learn more about digital banking and networking opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-primary text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Next Event</h2>
          <p className="text-xl mb-8">
            Be part of our growing community of successful businesses
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register Now'}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}