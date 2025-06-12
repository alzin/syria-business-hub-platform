
-- First, drop the existing triggers
DROP TRIGGER IF EXISTS update_post_votes_trigger ON public.votes;
DROP TRIGGER IF EXISTS update_answer_votes_trigger ON public.votes;

-- Create new triggers without WHEN conditions - let the functions handle the logic
-- Trigger for post votes
CREATE TRIGGER update_post_votes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_post_votes();

-- Trigger for answer votes
CREATE TRIGGER update_answer_votes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_answer_votes();
