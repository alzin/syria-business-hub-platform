
-- Remove the location check constraint that's causing registration failures
ALTER TABLE public.profiles DROP CONSTRAINT profiles_location_check;
