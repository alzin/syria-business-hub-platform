
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export const useRealtimeNotifications = () => {
  const { user, session } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user || !session) {
      console.log('No user or session, skipping realtime setup');
      return;
    }

    console.log('Setting up realtime notifications for user:', user.id);

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('New notification received via realtime:', payload);
          
          // Invalidate notifications query to refresh the list
          queryClient.invalidateQueries({ queryKey: ['notifications', user.id] });
          
          // Show toast notification
          const notification = payload.new;
          if (notification) {
            toast({
              title: notification.title || 'New Notification',
              description: notification.message || 'You have a new notification',
              duration: 5000,
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      console.log('Cleaning up realtime notifications channel');
      supabase.removeChannel(channel);
    };
  }, [user, session, queryClient]);
};
