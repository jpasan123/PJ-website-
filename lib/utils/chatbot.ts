'use client';

interface ProductSuggestion {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ChatbotResponse {
  message: string;
  suggestions?: ProductSuggestion[];
  links?: { text: string; url: string }[];
}

// Intent patterns for natural language processing
const intents = {
  greeting: /\b(hi|hello|hey|good\s*(morning|afternoon|evening))\b/i,
  product_search: /\b(looking\s*for|search|find|need|want)\b.*\b(product|item|equipment)\b/i,
  pricing: /\b(price|cost|expensive|cheap|affordable)\b/i,
  support: /\b(help|support|issue|problem|trouble)\b/i,
  availability: /\b(available|in\s*stock|when|stock)\b/i,
  shipping: /\b(shipping|delivery|ship|deliver|track)\b/i,
  categories: /\b(categories|types|kinds|options)\b/i,
  specs: /\b(specifications|specs|features|details)\b/i,
  payment: /\b(payment|pay|visa|mastercard|credit\s*card)\b/i,
  discount: /\b(discount|offer|deal|sale|coupon)\b/i
};

// Product categories for context-aware responses
const productCategories = [
  'Electronics',
  'Furniture',
  'Security',
  'Office Supplies',
  'Networking',
  'Storage'
];

export function generateChatbotResponse(message: string): ChatbotResponse {
  // Convert message to lowercase for better matching
  const lowerMessage = message.toLowerCase();

  // Check for greetings
  if (intents.greeting.test(lowerMessage)) {
    return {
      message: "Hello! Welcome to Commercial SMB. How can I assist you today? I can help you with product recommendations, pricing information, or technical support.",
      links: [
        { text: "Browse Products", url: "/products" },
        { text: "Contact Support", url: "/contact" }
      ]
    };
  }

  // Product search intent
  if (intents.product_search.test(lowerMessage)) {
    const suggestions = [
      { id: '1', name: 'Business Laptop Pro', price: 1299, category: 'Electronics' },
      { id: '2', name: 'Office Desk Premium', price: 499, category: 'Furniture' },
      { id: '3', name: 'Security Camera System', price: 599, category: 'Security' }
    ];

    return {
      message: "I can help you find the perfect product. Here are some popular items that might interest you:",
      suggestions
    };
  }

  // Pricing inquiries
  if (intents.pricing.test(lowerMessage)) {
    return {
      message: "Our products are competitively priced and we offer various payment plans. Would you like to see our price ranges by category?",
      links: [
        { text: "View Pricing", url: "/products" },
        { text: "Special Offers", url: "/products?filter=sale" }
      ]
    };
  }

  // Support queries
  if (intents.support.test(lowerMessage)) {
    return {
      message: "I'm here to help! Could you please specify what kind of support you need? We offer technical support, order assistance, and general product guidance.",
      links: [
        { text: "Technical Support", url: "/support" },
        { text: "Contact Us", url: "/contact" }
      ]
    };
  }

  // Shipping information
  if (intents.shipping.test(lowerMessage)) {
    return {
      message: "We offer free shipping on orders over $100. Standard delivery takes 3-5 business days, and express shipping is available. Would you like to know more about our shipping policies?",
      links: [
        { text: "Shipping Policy", url: "/shipping" },
        { text: "Track Order", url: "/orders/track" }
      ]
    };
  }

  // Default response
  return {
    message: "I understand you're asking about " + message + ". Could you please provide more details so I can better assist you? I'm knowledgeable about our products, pricing, shipping, and support services.",
    links: [
      { text: "Browse Products", url: "/products" },
      { text: "Contact Support", url: "/contact" }
    ]
  };
}