'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'The Future of Business Technology',
      excerpt: 'Explore emerging trends shaping the future of business technology and digital transformation.',
      author: 'Sarah Johnson',
      date: 'January 20, 2024',
      readTime: '5 min read',
      image: 'https://picsum.photos/seed/blog1/800/400',
      category: 'Technology'
    },
    {
      title: 'Maximizing Productivity with Smart Office Solutions',
      excerpt: 'Learn how smart office solutions can boost your team\'s productivity and efficiency.',
      author: 'Michael Chen',
      date: 'January 18, 2024',
      readTime: '4 min read',
      image: 'https://picsum.photos/seed/blog2/800/400',
      category: 'Productivity'
    },
    {
      title: 'Cybersecurity Best Practices for SMBs',
      excerpt: 'Essential cybersecurity measures every small and medium business should implement.',
      author: 'Emma Williams',
      date: 'January 15, 2024',
      readTime: '6 min read',
      image: 'https://picsum.photos/seed/blog3/800/400',
      category: 'Security'
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, updates, and expert advice for modern businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
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
          className="mt-16 text-center"
        >
          <Button size="lg">Load More Articles</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}