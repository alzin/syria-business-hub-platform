
export interface VoteRequest {
  postId?: string;
  answerId?: string;
  voteType: 'up' | 'down';
}

export interface Vote {
  post_id?: string;
  answer_id?: string;
  vote_type: 'up' | 'down';
}

export interface VoteResult {
  voteCount: number;
  postId?: string;
}
