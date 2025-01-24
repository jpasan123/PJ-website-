'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw sessionError;
      }
      
      if (!session) {
        router.push('/auth/login');
        return;
      }

      // Get user data from auth
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User error:', userError);
        throw userError;
      }

      if (!user) {
        throw new Error('No user found');
      }

      // Get profile data from users table
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
        throw profileError;
      }

      // If no profile exists, create one
      if (!profileData) {
        const newProfile = {
          id: user.id,
          full_name: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: '',
          address: '',
          avatar_url: user.user_metadata?.avatar_url || '',
        };

        const { error: insertError } = await supabase
          .from('users')
          .insert([newProfile]);

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }

        setProfile(newProfile);
        setFormData(newProfile);
      } else {
        // Use existing profile data
        const combinedProfile = {
          id: user.id,
          email: user.email || '',
          full_name: profileData.full_name || user.user_metadata?.full_name || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          avatar_url: profileData.avatar_url || user.user_metadata?.avatar_url || '',
        };

        setProfile(combinedProfile);
        setFormData(combinedProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !formData) return;

    setIsLoading(true);
    try {
      // Update users table
      const { error: updateError } = await supabase
        .from('users')
        .upsert({
          id: profile.id,
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (updateError) {
        console.error('Update error:', updateError);
        throw updateError;
      }

      // Update auth metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.full_name
        }
      });

      if (metadataError) {
        console.error('Metadata error:', metadataError);
        throw metadataError;
      }

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      
      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
      
      // Refresh the data
      await fetchProfile();
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type and size
    const fileType = file.type.split('/')[1];
    const validTypes = ['jpeg', 'jpg', 'png', 'webp'];
    if (!validTypes.includes(fileType)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPEG, PNG or WebP image',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      // First, try to delete the old avatar if it exists
      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          try {
            await supabase.storage
              .from('profiles')
              .remove([`avatars/${oldPath}`]);
          } catch (error) {
            console.error('Error deleting old avatar:', error);
          }
        }
      }

      // Upload new image
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      // Update auth metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (metadataError) throw metadataError;

      // Update local state
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);
      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));

      toast({
        title: 'Success',
        description: 'Profile image updated successfully',
      });

      // Refresh the page to ensure all components update
      router.refresh();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {formData.avatar_url ? (
                    <img
                      src={formData.avatar_url}
                      alt={formData.full_name || ''}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white"></div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{formData.full_name || 'Your Name'}</h1>
                <p className="text-white/80">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    name="full_name"
                    value={formData.full_name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    disabled
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile || {});
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}