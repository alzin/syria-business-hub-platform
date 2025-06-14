
-- Update the check constraint to allow all post types
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_type_check;

-- Add the updated check constraint with all allowed post types
ALTER TABLE public.posts ADD CONSTRAINT posts_type_check 
CHECK (type IN ('question', 'news', 'article', 'business_idea'));
