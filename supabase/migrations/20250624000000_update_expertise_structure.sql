
-- Add new columns for categorized expertise
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS expertise_category text,
ADD COLUMN IF NOT EXISTS expertise_specialization text;

-- Update existing records to use the new structure
-- Map current expertise values to categories
UPDATE public.profiles 
SET 
  expertise_category = CASE 
    WHEN expertise = 'legal' THEN 'Legal Expert'
    WHEN expertise = 'investor' THEN 'Investor'
    WHEN expertise = 'founder' THEN 'Founder'
    WHEN expertise = 'government' THEN 'Government'
    ELSE 'Founder'
  END,
  expertise_specialization = CASE 
    WHEN expertise = 'legal' THEN 'Legal Consulting (Contracts, Company Formation)'
    WHEN expertise = 'investor' THEN 'Financial Modeling'
    WHEN expertise = 'founder' THEN 'Business Plan Writing'
    WHEN expertise = 'government' THEN 'Project Management'
    ELSE 'Business Plan Writing'
  END
WHERE expertise_category IS NULL;

-- Update the handle_new_user function to use the new structure
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
