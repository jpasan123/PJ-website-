import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add error boundary utility
export function handleError(error: unknown) {
  console.error('An error occurred:', error);
  // You can add additional error handling logic here
}

// Add safe window check
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Add safe localStorage wrapper
export const storage = {
  get: (key: string) => {
    if (!isBrowser()) return null;
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  },
  set: (key: string, value: unknown) => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  remove: (key: string) => {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};