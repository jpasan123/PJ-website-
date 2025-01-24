'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useClickAway } from '@/hooks/use-click-away';
import { Search, X, ChevronDown, Tag, Laptop, Printer, Shield, Headphones, Package } from 'lucide-react';

// Define categories with icons and subcategories
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Laptop,
    subcategories: ['Laptops', 'Desktops', 'Tablets', 'Monitors', 'Accessories']
  },
  {
    id: 'office',
    name: 'Office Equipment',
    icon: Printer,
    subcategories: ['Printers', 'Scanners', 'Projectors', 'Phones', 'Furniture']
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    subcategories: ['Cameras', 'Access Control', 'Alarms', 'Surveillance', 'Safes']
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: Package,
    subcategories: ['Routers', 'Switches', 'Access Points', 'Cables', 'Tools']
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Headphones,
    subcategories: ['Audio', 'Video', 'Cables', 'Storage', 'Power']
  }
];

interface SearchBarProps {
  onSearch: (query: string, category?: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  // Simulated search suggestions based on query and selected category
  useEffect(() => {
    if (query.length > 1) {
      const category = categories.find(c => c.id === selectedCategory);
      let newSuggestions: string[] = [];

      if (category) {
        newSuggestions = category.subcategories
          .filter(sub => sub.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);
      } else {
        // Search across all categories
        newSuggestions = categories
          .flatMap(c => c.subcategories)
          .filter(sub => sub.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);
      }

      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, selectedCategory]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, selectedCategory || undefined);
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex gap-2">
        {/* Category Selector */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center gap-2 min-w-[140px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCategory ? (
              <>
                {categories.find(c => c.id === selectedCategory)?.name}
                <ChevronDown className="h-4 w-4" />
              </>
            ) : (
              <>
                All Categories
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* Category Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
              >
                <div className="p-2">
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsOpen(false);
                    }}
                  >
                    <Tag className="h-4 w-4" />
                    <span>All Categories</span>
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsOpen(false);
                      }}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200"
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch();
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}