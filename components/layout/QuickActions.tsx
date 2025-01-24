'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, MessageSquare, ShoppingCart, ArrowRight, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/lib/store/cart';
import { generateChatbotResponse } from '@/lib/utils/chatbot';
import Link from 'next/link';

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  suggestions?: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
  }>;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

export default function QuickActions() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();
  const { items, removeItem, updateQuantity } = useCartStore();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Add user message
      const userMessage: ChatMessage = { type: 'user', message: chatMessage };
      
      // Generate AI response
      const botResponse = generateChatbotResponse(chatMessage);
      const botMessage: ChatMessage = {
        type: 'bot',
        message: botResponse.message,
        suggestions: botResponse.suggestions,
        links: botResponse.links
      };
      
      setChatMessages([...chatMessages, userMessage, botMessage]);
      setChatMessage('');
    }
  };

  return (
    <>
      {/* Left Side Actions */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-lg"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5 text-primary" />
        </motion.button> */}
        <motion.a
          href="tel:1800123456"
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <Phone className="h-5 w-5 text-primary" />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-lg"
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            if (!isChatOpen && chatMessages.length === 0) {
              // Add initial greeting
              const botResponse = generateChatbotResponse("hello");
              setChatMessages([{
                type: 'bot',
                message: botResponse.message,
                links: botResponse.links
              }]);
            }
          }}
        >
          <MessageSquare className="h-5 w-5 text-primary" />
        </motion.button>
      </div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 w-96 bg-white rounded-lg shadow-2xl z-50"
          >
            <div className="p-4 gradient-primary text-white rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4 h-96 overflow-y-auto bg-gray-50">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-4 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      msg.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-800 shadow'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    
                    {msg.suggestions && (
                      <div className="mt-2 space-y-2">
                        {msg.suggestions.map((suggestion) => (
                          <Link
                            key={suggestion.id}
                            href={`/products/${suggestion.id}`}
                            className="block p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                          >
                            <p className="font-medium">{suggestion.name}</p>
                            <p className="text-sm text-gray-600">
                              ${suggestion.price} - {suggestion.category}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {msg.links && (
                      <div className="mt-2 space-y-2">
                        {msg.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.url}
                            className="block text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="inline h-3 w-3 mr-1" />
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="form-input mb-2 text-gray-900"
              />
              <Button type="submit" className="w-full gradient-primary">
                Send Message
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the component remains unchanged */}
    </>
  );
}