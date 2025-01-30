import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { isBrowser } from '@/lib/utils';

interface LikesStore {
  likedProducts: string[];
  isLoading: boolean;
  toggleLike: (productId: string) => Promise<void>;
  initializeLikes: () => Promise<void>;
}

// Create a custom storage object that handles both browser and non-browser environments
const customStorage = {
  getItem: (name: string) => {
    if (!isBrowser()) return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (!isBrowser()) return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (!isBrowser()) return;
    localStorage.removeItem(name);
  },
};

export const useLikesStore = create<LikesStore>()(
  persist(
    (set, get) => ({
      likedProducts: [],
      isLoading: false,
      toggleLike: async (productId: string) => {
        const supabase = createClientComponentClient();
        set({ isLoading: true });

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            throw new Error('User must be logged in to like products');
          }

          const isLiked = get().likedProducts.includes(productId);
          
          if (isLiked) {
            // Remove like
            await supabase
              .from('product_likes')
              .delete()
              .eq('user_id', session.user.id)
              .eq('product_id', productId);

            set(state => ({
              likedProducts: state.likedProducts.filter(id => id !== productId)
            }));
          } else {
            // Add like
            await supabase
              .from('product_likes')
              .insert([
                { user_id: session.user.id, product_id: productId }
              ]);

            set(state => ({
              likedProducts: [...state.likedProducts, productId]
            }));
          }
        } catch (error) {
          console.error('Error toggling product like:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      initializeLikes: async () => {
        const supabase = createClientComponentClient();
        set({ isLoading: true });

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) return;

          const { data: likes } = await supabase
            .from('product_likes')
            .select('product_id')
            .eq('user_id', session.user.id);

          if (likes) {
            set({ likedProducts: likes.map(like => like.product_id) });
          }
        } catch (error) {
          console.error('Error initializing likes:', error);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'likes-storage',
      storage: createJSONStorage(() => customStorage),
      skipHydration: true,
    }
  )
);