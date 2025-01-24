'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Shield, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
          <ScrollText className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-4xl mx-auto"
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-6 w-6 mr-2" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing or using our services, you agree to be bound by these Terms of Service
                and our Privacy Policy. If you disagree with any part of the terms, you may not
                access our services.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use,
                protect, and when necessary, disclose your personal information. Please read it here.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Services</h2>
              <p className="text-gray-600">
                We provide various business solutions and equipment through our platform. We reserve
                the right to modify, suspend, or discontinue any part of our services at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
              <p className="text-gray-600">
                When you create an account with us, you must provide accurate and complete information.
                You are responsible for maintaining the security of your account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
              <p className="text-gray-600">
                Payments for our products and services must be made according to the prices and terms
                displayed at the time of purchase. All payments are non-refundable unless otherwise
                specified.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600">
                All content, features, and functionality of our services are owned by us and are
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-gray-50 rounded-lg"
          >
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: legal@commercialsmb.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}