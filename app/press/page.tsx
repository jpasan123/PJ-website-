'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PressPage() {
  const pressReleases = [
    {
      title: 'Commercial SMB Launches New Enterprise Solutions',
      date: 'January 15, 2024',
      excerpt: 'Introducing revolutionary business management tools for growing enterprises.',
      category: 'Product Launch'
    },
    {
      title: 'Record Growth in Q4 2023',
      date: 'December 20, 2023',
      excerpt: 'Commercial SMB reports exceptional growth and market expansion.',
      category: 'Financial News'
    },
    {
      title: 'Sustainability Initiative 2024',
      date: 'January 5, 2024',
      excerpt: 'Announcing our commitment to carbon-neutral operations by 2025.',
      category: 'Corporate News'
    }
  ];

  const awards = [
    {
      title: 'Best Business Solution Provider 2023',
      organization: 'Tech Excellence Awards',
      icon: Award
    },
    {
      title: 'Fastest Growing Company 2023',
      organization: 'Business Growth Awards',
      icon: TrendingUp
    },
    {
      title: 'Innovation Leader 2023',
      organization: 'Industry Innovation Awards',
      icon: Newspaper
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Press & Media</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news and announcements from Commercial SMB.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="text-sm text-primary font-medium mb-2">
                    {release.category}
                  </div>
                  <CardTitle className="text-xl">{release.title}</CardTitle>
                  <div className="text-sm text-gray-500">{release.date}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{release.excerpt}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-primary text-white rounded-2xl p-12 mb-24"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <award.icon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-primary-foreground/80">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Media Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Press Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Download our press kit including logos, brand guidelines, and high-resolution images.
                </p>
                <Button>Download Press Kit</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Media Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For press and media inquiries, please contact our media relations team.
                </p>
                <Button>Contact Media Team</Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}