'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

const events = [
  {
    title: 'Digital Banking Summit 2024',
    date: 'March 15, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Virtual Event',
    image: 'https://picsum.photos/seed/event1/800/400',
  },
  {
    title: 'SME Growth Workshop',
    date: 'March 20, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'London Business Center',
    image: 'https://picsum.photos/seed/event2/800/400',
  },
];

const Events = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join our events to learn more about digital banking and networking opportunities
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.title} className="overflow-hidden">
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
                  </div>
                  <Button className="w-full mt-4">Register Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;