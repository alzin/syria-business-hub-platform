
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const usePhoneVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const requestVerification = async (userId: string, phoneNumber: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('request_phone_verification', {
        user_id: userId,
        phone_number: phoneNumber
      });

      if (error) throw error;

      const result = data as { success: boolean; verification_code: string; expires_at: string };
      
      if (result.success) {
        setIsCodeSent(true);
        setTimeLeft(600); // 10 minutes in seconds
        
        // In a real app, you would send the SMS here
        // For demo purposes, we'll show the code in a toast
        toast({
          title: "Verification Code Sent",
          description: `Your verification code is: ${result.verification_code}`,
          duration: 10000,
        });

        // Start countdown timer
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsCodeSent(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error: any) {
      console.error('Error requesting verification:', error);
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (userId: string, code: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('verify_phone_code', {
        user_id: userId,
        code: code
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; message?: string };
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Phone number verified successfully!",
        });
        setIsCodeSent(false);
        setVerificationCode('');
        return true;
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "Invalid verification code",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      console.error('Error verifying code:', error);
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    isLoading,
    verificationCode,
    setVerificationCode,
    isCodeSent,
    timeLeft,
    requestVerification,
    verifyCode,
    formatTime,
  };
};
