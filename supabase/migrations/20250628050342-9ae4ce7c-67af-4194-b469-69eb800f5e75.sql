
-- Add languages column to the profiles table to store multiple languages
ALTER TABLE public.profiles 
ADD COLUMN languages TEXT[];
