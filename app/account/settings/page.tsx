'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Bell, Mail, Shield, Eye, Globe } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Load user settings from database
        const { data, error } = await supabase
          .from('users')
          .select('settings')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (data?.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [supabase]);

  const handleSettingChange = async (key: keyof typeof settings) => {
    try {
      const newSettings = { ...settings, [key]: !settings[key] };
      setSettings(newSettings);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { error } = await supabase
        .from('users')
        .update({ settings: newSettings })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: 'Settings updated',
        description: 'Your preferences have been saved',
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Account Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email updates about your account</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleSettingChange('emailNotifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive push notifications about your orders</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleSettingChange('pushNotifications')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-500">Receive emails about new products and deals</p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={() => handleSettingChange('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleSettingChange('twoFactorAuth')}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}