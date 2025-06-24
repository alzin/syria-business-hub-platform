
-- Update the EXPERTISE_OPTIONS in the types to match your new structure
-- First, let's update existing records to use the new categories

-- Update existing records with the old simple categories to map to new ones
UPDATE public.profiles 
SET 
  expertise_category = CASE 
    WHEN expertise = 'legal' THEN 'Legal Expert'
    WHEN expertise = 'investor' THEN 'Investor'
    WHEN expertise = 'founder' THEN 'Founder'
    WHEN expertise = 'government' THEN 'Government'
    ELSE expertise_category -- Keep existing if already set
  END,
  expertise_specialization = CASE 
    WHEN expertise = 'legal' AND expertise_specialization IS NULL THEN 'Legal Consulting (Contracts, Company Formation)'
    WHEN expertise = 'investor' AND expertise_specialization IS NULL THEN NULL -- No specialization required
    WHEN expertise = 'founder' AND expertise_specialization IS NULL THEN NULL -- No specialization required  
    WHEN expertise = 'government' AND expertise_specialization IS NULL THEN NULL -- No specialization required
    ELSE expertise_specialization -- Keep existing if already set
  END;

-- Update the handle_new_user function to handle the new categories without required specialization
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
    expertise, 
    expertise_category,
    expertise_specialization,
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
    new.raw_user_meta_data->>'expertise_category',
    new.raw_user_meta_data->>'expertise_specialization',
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
