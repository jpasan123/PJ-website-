'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Server, 
  Shield, 
  Users, 
  Headphones, 
  Cloud, 
  Settings, 
  LineChart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Server,
    title: 'IT Infrastructure',
    description: 'Enterprise-grade infrastructure solutions tailored for your business needs',
    features: [
      'Server Management',
      'Network Setup',
      'Hardware Solutions',
      'System Integration'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Advanced security measures to protect your business assets and data',
    features: [
      'Threat Detection',
      'Data Encryption',
      'Security Audits',
      'Compliance Management'
    ],
    color: 'from-emerald-500 to-green-600'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud services for modern business operations',
    features: [
      'Cloud Migration',
      'Hybrid Solutions',
      'Data Backup',
      'Cloud Security'
    ],
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Settings,
    title: 'Managed Services',
    description: '24/7 monitoring and management of your IT environment',
    features: [
      'System Monitoring',
      'Performance Optimization',
      'Regular Maintenance',
      'Issue Resolution'
    ],
    color: 'from-orange-500 to-red-600'
  }
];

const additionalServices = [
  {
    icon: Users,
    title: 'Consulting',
    description: 'Expert guidance for digital transformation and growth',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Headphones,
    title: 'Support Services',
    description: 'Dedicated technical support team at your service',
    color: 'from-rose-500 to-pink-600'
  },
  {
    icon: LineChart,
    title: 'Business Analytics',
    description: 'Data-driven insights to optimize your operations',
    color: 'from-amber-500 to-orange-600'
  }
];

export default function Services() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive business solutions to drive your success
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 transform group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="space-y-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6"
                      >
                        <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Button className={`bg-gradient-to-r ${service.color} text-white hover:shadow-lg group/button`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover/button:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} p-3 mx-auto mb-4 transform group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="ghost" className="group/button">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover/button:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/services">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}