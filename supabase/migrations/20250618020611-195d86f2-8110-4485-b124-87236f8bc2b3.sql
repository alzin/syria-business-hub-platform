
-- Add new columns to the profiles table for enhanced user information
ALTER TABLE public.profiles 
ADD COLUMN specialization TEXT,
ADD COLUMN industry_sector TEXT;

-- Update the existing expertise enum values by recreating the constraint
-- First, let's see what expertise values are currently being used and update them

-- Add more comprehensive expertise categories
-- Since we can't easily modify enum in PostgreSQL without recreating,
-- we'll handle this at the application level with validation

-- Update the handle_new_user function to handle the new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer set search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    name, 
    expertise, 
    location, 
    phone_number, 
    phone_country_code, 
    phone_verified,
    specialization,
    industry_sector
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    COALESCE(new.raw_user_meta_data->>'expertise', 'founder'),
    COALESCE(new.raw_user_meta_data->>'location', 'Syria'),
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'phone_country_code',
    false,
    new.raw_user_meta_data->>'specialization',
    new.raw_user_meta_data->>'industry_sector'
  );
  RETURN new;
END;
$$;
