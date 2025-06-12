
-- Create triggers to automatically update vote counts when votes are added, updated, or deleted

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
