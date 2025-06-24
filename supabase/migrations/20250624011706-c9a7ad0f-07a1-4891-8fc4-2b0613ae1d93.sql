
-- Remove the old check constraint that's blocking registration
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_expertise_check;

-- Since we're now using expertise_category and expertise_specialization,
-- we can make the old expertise column more flexible or remove its constraint
-- Let's keep it for backward compatibility but remove the restrictive constraint
