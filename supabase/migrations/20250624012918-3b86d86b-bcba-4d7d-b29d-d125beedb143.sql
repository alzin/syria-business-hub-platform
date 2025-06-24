
-- Remove obsolete columns from the profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS specialization;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS industry_sector;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS expertise;

-- Update the handle_new_user function to remove references to deleted columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    name, 
    expertise_category,
    expertise_specialization,
    location, 
    phone_number, 
    phone_country_code, 
    phone_verified
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.raw_user_meta_data->>'expertise_category',
    new.raw_user_meta_data->>'expertise_specialization',
    COALESCE(new.raw_user_meta_data->>'location', 'Syria'),
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'phone_country_code',
    false
  );
  RETURN new;
END;
$$;
