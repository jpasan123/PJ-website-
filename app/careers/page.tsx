'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Briefcase, HeadphonesIcon, LineChart, Users } from 'lucide-react';

export default function CareersPage() {
  const positions = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      icon: Code,
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'London',
      type: 'Full-time',
      icon: Briefcase,
    },
    {
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'New York',
      type: 'Full-time',
      icon: HeadphonesIcon,
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Singapore',
      type: 'Full-time',
      icon: LineChart,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a dynamic team shaping the future of business solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <position.icon className="h-8 w-8 text-primary mb-4" />
                    <CardTitle>{position.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Department: {position.department}</p>
                      <p>Location: {position.location}</p>
                      <p>Type: {position.type}</p>
                      <Button className="w-full mt-4">Apply Now</Button>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-12 shadow-xl"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <Code className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Innovation First</h3>
                    <p className="mt-2 text-gray-600">Work with cutting-edge technologies and shape the future.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Great Culture</h3>
                    <p className="mt-2 text-gray-600">Join a diverse and inclusive workplace that values your growth.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://picsum.photos/seed/careers/600/400"
                alt="Office Culture"
                className="rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}