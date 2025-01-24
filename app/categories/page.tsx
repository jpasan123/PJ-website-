'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Laptop, Printer, Shield, Network, Code, Armchair, Database, Shirt, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Electronics',
    icon: Laptop,
    description: 'Computers, laptops, and tablets',
    itemCount: '150+ items',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    featured: ['Business Laptops', 'Tablets', 'Monitors', 'Accessories']
  },
  {
    name: 'Office Equipment',
    icon: Printer,
    description: 'Printers, scanners, and copiers',
    itemCount: '100+ items',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    featured: ['Printers', 'Scanners', 'Copiers', 'Paper Supplies']
  },
  {
    name: 'Security Systems',
    icon: Shield,
    description: 'CCTV, access control, and alarms',
    itemCount: '80+ items',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    featured: ['CCTV Systems', 'Access Control', 'Alarms', 'Security Cameras']
  },
  {
    name: 'Networking',
    icon: Network,
    description: 'Routers, switches, and network equipment',
    itemCount: '120+ items',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800',
    featured: ['Routers', 'Switches', 'Network Cards', 'Cables']
  },
  {
    name: 'Software',
    icon: Code,
    description: 'Business and productivity software',
    itemCount: '200+ items',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800',
    featured: ['Office Suite', 'Security Software', 'Design Tools', 'Business Apps']
  },
  {
    name: 'Furniture',
    icon: Armchair,
    description: 'Office furniture and ergonomic solutions',
    itemCount: '90+ items',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    featured: ['Desks', 'Chairs', 'Storage', 'Conference Tables']
  },
  {
    name: 'Storage',
    icon: Database,
    description: 'Data storage and backup solutions',
    itemCount: '70+ items',
    image: 'https://images.unsplash.com/photo-1606161290889-77950cfb67d3?auto=format&fit=crop&w=800',
    featured: ['Hard Drives', 'SSDs', 'NAS', 'Backup Systems']
  },
  {
    name: 'Clothes',
    icon: Shirt,
    description: 'Professional business attire and uniforms',
    itemCount: '300+ items',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800',
    featured: ['Business Suits', 'Uniforms', 'Accessories', 'Safety Wear']
  },
  {
    name: 'Food',
    icon: UtensilsCrossed,
    description: 'Office pantry and catering solutions',
    itemCount: '250+ items',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800',
    featured: ['Pantry Supplies', 'Catering Services', 'Snacks', 'Beverages']
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-xl text-gray-600">
            Browse our comprehensive range of business equipment and solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{category.itemCount}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>

                    <p className="text-gray-600 mb-4">{category.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">Popular Items:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {category.featured.map((item) => (
                          <li key={item} className="flex items-center">
                            <div className="h-1 w-1 bg-primary rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Browse {category.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}