
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const isDevelopment = import.meta.env.DEV;

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      if (isDevelopment) {
        console.log('No user ID, skipping realtime setup');
      }
      return;
    }

    // Prevent multiple simultaneous connection attempts
    if (isConnecting) {
      if (isDevelopment) {
        console.log('Already connecting, skipping duplicate setup');
      }
      return;
    }

    const setupRealtimeChannel = () => {
      // Clean up any existing channel first
      if (channelRef.current) {
        if (isDevelopment) {
          console.log('Cleaning up existing realtime channel');
        }
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      setIsConnecting(true);

      if (isDevelopment) {
        console.log('Setting up realtime notifications for user:', user.id);
      }

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
            if (isDevelopment) {
              console.log('New notification received via realtime:', payload);
            }
            
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
          if (isDevelopment) {
            console.log('Realtime subscription status:', status);
          }
          
          if (err) {
            console.error('Realtime subscription error:', err);
          }

          switch (status) {
            case 'SUBSCRIBED':
              if (isDevelopment) {
                console.log('Successfully subscribed to realtime notifications');
              }
              setIsConnecting(false);
              // Clear any retry timeouts since we're now connected
              if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
              }
              break;
              
            case 'CHANNEL_ERROR':
            case 'TIMED_OUT':
              if (isDevelopment) {
                console.warn(`Realtime connection ${status.toLowerCase()}, will retry in 10 seconds`);
              }
              setIsConnecting(false);
              // Schedule a retry after a longer delay to be less aggressive
              if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
              }
              retryTimeoutRef.current = setTimeout(() => {
                if (isDevelopment) {
                  console.log('Retrying realtime connection...');
                }
                setupRealtimeChannel();
              }, 10000); // Increased from 5 to 10 seconds
              break;
              
            case 'CLOSED':
              if (isDevelopment) {
                console.log('Realtime connection closed');
              }
              setIsConnecting(false);
              break;
          }
        });

      channelRef.current = channel;
    };

    setupRealtimeChannel();

    return () => {
      if (isDevelopment) {
        console.log('Cleaning up realtime notifications');
      }
      
      setIsConnecting(false);
      
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
  }, [user?.id]); // Only depend on user.id, not the entire user object, session, or queryClient
};
