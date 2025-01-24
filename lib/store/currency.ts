'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to USD
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', rate: 320.50 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 148.50 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.35 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.19 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.12 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.34 }
];

interface CurrencyState {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currentCurrency: currencies[0], // Default to USD
      setCurrency: (currency) => set({ currentCurrency: currency })
    }),
    {
      name: 'currency-storage',
      skipHydration: true
    }
  )
);

// Helper function to convert prices
export function convertPrice(priceUSD: number, targetCurrency: Currency): string {
  const convertedPrice = priceUSD * targetCurrency.rate;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(convertedPrice);
}