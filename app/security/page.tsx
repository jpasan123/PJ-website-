'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Key, Server, FileCheck, Users } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit and at rest using industry-standard protocols.'
    },
    {
      icon: Key,
      title: 'Multi-Factor Authentication',
      description: 'Additional security layer to protect your account access.'
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade security with regular security audits and updates.'
    },
    {
      icon: FileCheck,
      title: 'Compliance',
      description: 'Adherence to international security standards and regulations.'
    },
    {
      icon: Shield,
      title: 'Fraud Protection',
      description: 'Advanced fraud detection and prevention systems.'
    },
    {
      icon: Users,
      title: 'Access Control',
      description: 'Granular user permissions and role-based access control.'
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
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Security & Privacy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your security is our top priority. Learn about our comprehensive security measures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-primary text-white rounded-2xl p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Security Commitment</h2>
            <p className="text-lg mb-8">
              We employ industry-leading security measures and regularly update our systems to ensure
              your data remains protected. Our dedicated security team works around the clock to
              monitor and enhance our security infrastructure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-primary-foreground/80">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-primary-foreground/80">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">ISO 27001</div>
                <div className="text-primary-foreground/80">Certified</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}