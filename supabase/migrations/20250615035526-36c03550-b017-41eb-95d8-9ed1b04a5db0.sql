
-- Create a trigger to update post votes when a vote is inserted, updated, or deleted
CREATE TRIGGER trigger_update_post_votes
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_post_votes();

-- Create a trigger to update answer votes when a vote is inserted, updated, or deleted
CREATE TRIGGER trigger_update_answer_votes
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_answer_votes();

-- Recalculate and update the vote counts for all existing posts
UPDATE public.posts p
SET votes = (
  SELECT 
    (COUNT(CASE WHEN v.vote_type = 'up' THEN 1 END) - 
     COUNT(CASE WHEN v.vote_type = 'down' THEN 1 END))
  FROM public.votes v
  WHERE v.post_id = p.id
);

-- Recalculate and update the vote counts for all existing answers
UPDATE public.answers a
SET votes = (
  SELECT 
    (COUNT(CASE WHEN v.vote_type = 'up' THEN 1 END) - 
     COUNT(CASE WHEN v.vote_type = 'down' THEN 1 END))
  FROM public.votes v
  WHERE v.answer_id = a.id
);
