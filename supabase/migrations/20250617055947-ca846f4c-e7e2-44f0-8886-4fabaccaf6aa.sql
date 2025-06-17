
-- Create function to generate verification codes
CREATE OR REPLACE FUNCTION public.generate_verification_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::text, 6, '0');
END;
$function$;

-- Create function to request phone verification
CREATE OR REPLACE FUNCTION public.request_phone_verification(user_id uuid, phone_number text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  verification_code text;
  expires_at timestamp with time zone;
BEGIN
  verification_code := generate_verification_code();
  expires_at := now() + interval '10 minutes';
  
  UPDATE public.profiles 
  SET 
    phone_verification_code = verification_code,
    verification_expires_at = expires_at,
    phone_verified = false
  WHERE id = user_id;
  
  RETURN json_build_object(
    'success', true,
    'verification_code', verification_code,
    'expires_at', expires_at
  );
END;
$function$;

-- Create function to verify phone code
CREATE OR REPLACE FUNCTION public.verify_phone_code(user_id uuid, code text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  stored_code text;
  expires_at timestamp with time zone;
BEGIN
  SELECT phone_verification_code, verification_expires_at
  INTO stored_code, expires_at
  FROM public.profiles
  WHERE id = user_id;
  
  IF stored_code IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'No verification code found');
  END IF;
  
  IF expires_at < now() THEN
    RETURN json_build_object('success', false, 'error', 'Verification code has expired');
  END IF;
  
  IF stored_code != code THEN
    RETURN json_build_object('success', false, 'error', 'Invalid verification code');
  END IF;
  
  UPDATE public.profiles 
  SET 
    phone_verified = true,
    phone_verification_code = NULL,
    verification_expires_at = NULL
  WHERE id = user_id;
  
  RETURN json_build_object('success', true, 'message', 'Phone number verified successfully');
END;
$function$;
