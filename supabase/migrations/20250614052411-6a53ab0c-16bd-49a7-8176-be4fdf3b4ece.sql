
-- Add new post types to the posts table
-- The existing type column already supports text, so we just need to ensure it can handle 'article' and 'business_idea'

-- Add optional fields for business ideas
ALTER TABLE public.posts 
ADD COLUMN investment_needed text,
ADD COLUMN timeline text,
ADD COLUMN looking_for_partners boolean DEFAULT false,
ADD COLUMN contact_info text;

-- Add a comment to document the allowed post types
COMMENT ON COLUMN public.posts.type IS 'Allowed values: question, news, article, business_idea';

-- Add a comment to explain the new fields
COMMENT ON COLUMN public.posts.investment_needed IS 'Investment amount needed for business ideas';
COMMENT ON COLUMN public.posts.timeline IS 'Expected timeline for business idea implementation';
COMMENT ON COLUMN public.posts.looking_for_partners IS 'Whether the business idea author is looking for partners';
COMMENT ON COLUMN public.posts.contact_info IS 'Contact information for business idea collaboration';
