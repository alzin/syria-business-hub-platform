
-- Drop functions and their dependent triggers
DROP FUNCTION IF EXISTS public.update_post_votes() CASCADE;
DROP FUNCTION IF EXISTS public.update_answer_votes() CASCADE;

-- Drop the votes table and any dependencies
DROP TABLE IF EXISTS public.votes CASCADE;

-- Remove the votes column from the posts table
ALTER TABLE public.posts
DROP COLUMN IF EXISTS votes;

-- Remove the votes column from the answers table
ALTER TABLE public.answers
DROP COLUMN IF EXISTS votes;
