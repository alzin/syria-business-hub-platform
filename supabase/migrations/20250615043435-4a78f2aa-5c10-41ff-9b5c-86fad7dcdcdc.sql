
-- Recalculate and update the vote counts for all existing posts
UPDATE public.posts p
SET votes = COALESCE((
  SELECT 
    (COUNT(CASE WHEN v.vote_type = 'up' THEN 1 END) - 
     COUNT(CASE WHEN v.vote_type = 'down' THEN 1 END))
  FROM public.votes v
  WHERE v.post_id = p.id
), 0);

-- Recalculate and update the vote counts for all existing answers
UPDATE public.answers a
SET votes = COALESCE((
  SELECT 
    (COUNT(CASE WHEN v.vote_type = 'up' THEN 1 END) - 
     COUNT(CASE WHEN v.vote_type = 'down' THEN 1 END))
  FROM public.votes v
  WHERE v.answer_id = a.id
), 0);
