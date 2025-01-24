'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Bell,
  Shield,
  Mail,
  Globe,
  Database,
  Cloud,
  Lock,
  RefreshCw,
  Save,
  AlertTriangle
} from 'lucide-react';

interface Settings {
  emailNotifications: boolean;
  backupEnabled: boolean;
  maintenanceMode: boolean;
  analyticsEnabled: boolean;
  apiRateLimit: number;
  debugMode: boolean;
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    backupEnabled: true,
    maintenanceMode: false,
    analyticsEnabled: true,
    apiRateLimit: 100,
    debugMode: false,
    siteTitle: 'Commercial SMB',
    siteDescription: 'Business Equipment & Solutions',
    contactEmail: 'admin@commercialsmb.com'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Save settings to admin_settings table
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          key: 'site_settings',
          value: settings,
          updated_by: session.user.id,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: 'Settings saved',
        description: 'Your changes have been saved successfully.'
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Site Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Title</label>
              <Input
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Site Description</label>
              <Input
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive system notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automated Backups</p>
                <p className="text-sm text-gray-500">Enable daily database backups</p>
              </div>
              <Switch
                checked={settings.backupEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, backupEnabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Put site in maintenance mode</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-gray-500">Enable usage analytics</p>
              </div>
              <Switch
                checked={settings.analyticsEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, analyticsEnabled: checked })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">API Rate Limit (requests/minute)</label>
              <Input
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Maintenance Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
              <Button variant="outline" className="w-full">
                <Cloud className="h-4 w-4 mr-2" />
                Sync Data
              </Button>
              <Button variant="outline" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Security Scan
              </Button>
              <Button variant="outline" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Error Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}