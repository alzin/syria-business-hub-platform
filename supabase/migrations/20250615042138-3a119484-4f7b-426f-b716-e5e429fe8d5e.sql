
-- Only recalculate the vote counts for existing posts and answers
-- (Skip creating triggers since they already exist)

-- Recalculate and update the vote counts for all existing posts
UPDATE public.posts p
SET votes = (
  SELECT 
    COALESCE(
      (COUNT(CASE WHEN v.vote_type = 'up' THEN 1 END) - 
       COUNT(CASE WHEN v.vote_type = 'down' THEN 1 END)), 0
    )
  FROM public.votes v
  WHERE v.post_id = p.id
);

-- Recalculate and update the vote counts for all existing answers
UPDATE public.answers a
SET votes = (
  SELECT 
    COALESCE(
      (COUNT(CASE WHEN v.vote_type = 'up' THEN 1 END) - 
       COUNT(CASE WHEN v.vote_type = 'down' THEN 1 END)), 0
    )
  FROM public.votes v
  WHERE v.answer_id = a.id
);
