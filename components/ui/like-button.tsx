'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLikesStore } from '@/lib/store/likes';
import { useToast } from '@/hooks/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface LikeButtonProps {
  productId: string;
  className?: string;
}

export function LikeButton({ productId, className = '' }: LikeButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { likedProducts, toggleLike, initializeLikes } = useLikesStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeLikes();
  }, [initializeLikes]);

  useEffect(() => {
    setIsLiked(likedProducts.includes(productId));
  }, [likedProducts, productId]);

  const handleLike = async () => {
    setIsLoading(true);
    const supabase = createClientComponentClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to like products",
        });
        router.push('/auth/login');
        return;
      }

      await toggleLike(productId);
      
      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: isLiked ? "Product removed from your favorites" : "Product added to your favorites",
      });
    } catch (error) {
      console.error('Error toggling product like:', error);
      toast({
        title: "Error",
        description: "Could not update product likes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative bg-white/80 backdrop-blur-sm hover:bg-white ${className}`}
      onClick={handleLike}
      disabled={isLoading}
    >
      <AnimatePresence>
        <motion.div
          key={isLiked ? 'liked' : 'unliked'}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}