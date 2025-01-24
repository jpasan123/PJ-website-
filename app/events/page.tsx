'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EventsPage() {
  const { toast } = useToast();

  const handleRegister = () => {
    toast({
      title: "Registration successful!",
      description: "You have been registered for the event.",
    });
  };

  const events = [
    {
      title: 'Digital Banking Summit 2024',
      date: 'March 15, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual Event',
      image: 'https://picsum.photos/seed/event1/800/400',
      spots: '500 spots available'
    },
    {
      title: 'SME Growth Workshop',
      date: 'March 20, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'London Business Center',
      image: 'https://picsum.photos/seed/event2/800/400',
      spots: '100 spots available'
    },
    {
      title: 'Tech Innovation Conference',
      date: 'April 5, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'Singapore Convention Center',
      image: 'https://picsum.photos/seed/event3/800/400',
      spots: '300 spots available'
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div> <boltAction type="file" filePath="app/events/page.tsx">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{event.spots}</span>
                    </div>
                    <Button className="w-full mt-4" onClick={handleRegister}>
                      Register Now
                    </Button>
                  </div>
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
          <h2 className="text-3xl font-bold mb-6">Host Your Own Event</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Interested in hosting a business event or workshop? Partner with us to reach our community.
          </p>
          <Button variant="secondary" size="lg">
            Contact Event Team
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}