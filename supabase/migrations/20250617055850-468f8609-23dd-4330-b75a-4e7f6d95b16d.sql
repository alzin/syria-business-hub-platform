
-- Add phone verification fields to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone_verified boolean DEFAULT false,
ADD COLUMN phone_verification_code text,
ADD COLUMN verification_expires_at timestamp with time zone;

-- Create index for efficient verification code lookups
CREATE INDEX idx_profiles_verification_code ON public.profiles(phone_verification_code) WHERE phone_verification_code IS NOT NULL;
