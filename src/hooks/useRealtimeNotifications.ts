
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export const useRealtimeNotifications = () => {
  const { user, session } = useAuth();
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user || !session) {
      console.log('No user or session, skipping realtime setup');
      return;
    }

    const setupRealtimeChannel = () => {
      // Clean up any existing channel first
      if (channelRef.current) {
        console.log('Cleaning up existing realtime channel');
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      console.log('Setting up realtime notifications for user:', user.id);

      const channel = supabase
        .channel(`notifications-${user.id}`, {
          config: {
            presence: {
              key: user.id,
            },
          },
        })
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
        .subscribe((status, err) => {
          console.log('Realtime subscription status:', status);
          
          if (err) {
            console.error('Realtime subscription error:', err);
          }

          switch (status) {
            case 'SUBSCRIBED':
              console.log('Successfully subscribed to realtime notifications');
              // Clear any retry timeouts since we're now connected
              if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
              }
              break;
              
            case 'CHANNEL_ERROR':
            case 'TIMED_OUT':
            case 'CLOSED':
              console.warn(`Realtime connection ${status.toLowerCase()}, will retry in 5 seconds`);
              // Schedule a retry after a delay
              if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
              }
              retryTimeoutRef.current = setTimeout(() => {
                console.log('Retrying realtime connection...');
                setupRealtimeChannel();
              }, 5000);
              break;
          }
        });

      channelRef.current = channel;
    };

    setupRealtimeChannel();

    return () => {
      console.log('Cleaning up realtime notifications');
      
      // Clear any pending retry timeouts
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      
      // Remove the channel
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [user?.id, session, queryClient]); // Depend on user.id instead of user object to reduce re-renders
};
