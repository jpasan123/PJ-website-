'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, MessageSquare, Clock, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const locations = [
    {
      city: 'London',
      address: '123 Business Avenue',
      phone: '+44 20 1234 5678',
      email: 'london@commercialsmb.com'
    },
    {
      city: 'New York',
      address: '456 Commerce Street',
      phone: '+1 212 345 6789',
      email: 'newyork@commercialsmb.com'
    },
    {
      city: 'Singapore',
      address: '789 Enterprise Road',
      phone: '+65 6789 0123',
      email: 'singapore@commercialsmb.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Quick Actions remain unchanged */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Our friendly team is always here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542356299597!2d-0.12802772334095913!3d51.50733097181083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089c627!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1708786037613!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Input 
                  type="text" 
                  required 
                  className="form-input mt-1" 
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input 
                  type="email" 
                  required 
                  className="form-input mt-1" 
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <Input 
                  type="text" 
                  required 
                  className="form-input mt-1" 
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <Textarea 
                  required 
                  className="form-input mt-1" 
                  rows={6} 
                  placeholder="Enter your message"
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <MapPin className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.city}</h3>
                    <p className="text-gray-600 mb-4">{location.address}</p>
                    <div className="space-y-2">
                      <p className="flex items-center justify-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {location.phone}
                      </p>
                      <p className="flex items-center justify-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {location.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Widget */}
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-2xl z-50"
        >
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Live Chat</span>
            </div>
            <button onClick={() => setChatOpen(false)}>×</button>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            <div className="text-center text-gray-600">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p>Our support team is online</p>
              <p className="text-sm">Average response time: 2 minutes</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <Input 
              placeholder="Type your message..." 
              className="form-input mb-2" 
            />
            <Button className="w-full">Send Message</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}