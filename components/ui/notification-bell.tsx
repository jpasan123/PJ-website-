'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchNotifications();
    // Set up polling for notifications instead of realtime
    const pollInterval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    
    return () => clearInterval(pollInterval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.read).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-3 rounded-lg ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No notifications
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}