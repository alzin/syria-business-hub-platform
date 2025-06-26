
-- First, let's completely remove any existing constraints
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_category_check;

-- Update ALL posts to ensure they have valid categories
UPDATE public.posts SET category = 'business_idea' WHERE category IS NULL OR category = '';
UPDATE public.posts SET category = 'legal' WHERE category LIKE '%legal%';
UPDATE public.posts SET category = 'business_economic' WHERE category LIKE '%invest%' OR category LIKE '%economic%' OR category LIKE '%business%';
UPDATE public.posts SET category = 'marketing_sales' WHERE category LIKE '%market%' OR category LIKE '%sales%';
UPDATE public.posts SET category = 'technology' WHERE category LIKE '%tech%';
UPDATE public.posts SET category = 'design_creative' WHERE category LIKE '%design%' OR category LIKE '%creative%';
UPDATE public.posts SET category = 'content_creation' WHERE category LIKE '%content%';
UPDATE public.posts SET category = 'languages' WHERE category LIKE '%language%';
UPDATE public.posts SET category = 'education' WHERE category LIKE '%education%';
UPDATE public.posts SET category = 'art' WHERE category LIKE '%art%';

-- Make sure any remaining invalid categories are set to business_idea
UPDATE public.posts 
SET category = 'business_idea' 
WHERE category NOT IN (
  'business_idea', 
  'business_economic', 
  'technology', 
  'design_creative', 
  'marketing_sales', 
  'content_creation', 
  'languages', 
  'education', 
  'art', 
  'legal'
);

-- Now add the constraint
ALTER TABLE public.posts ADD CONSTRAINT posts_category_check 
CHECK (category IN (
  'business_idea', 
  'business_economic', 
  'technology', 
  'design_creative', 
  'marketing_sales', 
  'content_creation', 
  'languages', 
  'education', 
  'art', 
  'legal'
));
