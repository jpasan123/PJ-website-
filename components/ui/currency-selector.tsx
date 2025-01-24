'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DollarSign } from 'lucide-react';
import { useCurrencyStore, currencies } from '@/lib/store/currency';

export function CurrencySelector() {
  const { currentCurrency, setCurrency } = useCurrencyStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <DollarSign className="h-5 w-5" />
          <span className="sr-only">Select currency</span>
          <span className="absolute -bottom-1 -right-1 text-xs font-bold">
            {currentCurrency.code}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setCurrency(currency)}
            className="flex items-center justify-between"
          >
            <span>{currency.name}</span>
            <span className="text-gray-500">{currency.symbol}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}