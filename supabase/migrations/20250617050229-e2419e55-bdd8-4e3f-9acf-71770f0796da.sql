
-- Add phone number fields to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone_number text,
ADD COLUMN phone_country_code text;

-- Update the handle_new_user function to include phone number fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, name, expertise, location, phone_number, phone_country_code)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    COALESCE(new.raw_user_meta_data->>'expertise', 'founder'),
    COALESCE(new.raw_user_meta_data->>'location', 'Syria'),
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'phone_country_code'
  );
  RETURN new;
END;
$function$
