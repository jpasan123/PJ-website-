import ProductDetails from './ProductDetails';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Temporary mock data for static generation
const mockProducts = [
  { id: '1' },
  { id: '2' },
  { id: '3' }
];

export async function generateStaticParams() {
  // Use mock data instead of Supabase call for static export
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetails id={params.id} />;
}