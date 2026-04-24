import React from 'react';
import { useFreighter } from '@/hooks/useFreighter';
import { useGovernance } from '@/hooks/useGovernance';
import { toast } from 'react-hot-toast';

interface VoteButtonProps {
  proposalId: number;
  voteFor: boolean;
  hasVoted: boolean;
  votingClosed: boolean;
  onVoteSuccess?: () => void;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  proposalId,
  voteFor,
  hasVoted,
  votingClosed,
  onVoteSuccess,
}) => {
  const { isConnected } = useFreighter();
  const { vote, isLoading } = useGovernance(); 

  // Disable if already voted, voting is closed, wallet is disconnected, or tx is loading
  const isDisabled = hasVoted || votingClosed || !isConnected || isLoading;

  const handleVote = async () => {
    try {
      await vote(proposalId, voteFor);
      toast.success(`Successfully voted ${voteFor ? 'FOR' : 'AGAINST'}`);
      onVoteSuccess?.();
    } catch (error) {
      toast.error('Failed to cast vote');
      console.error(error);
    }
  };

  return (
    <button
      className={voteFor ? 'btn-primary' : 'btn-secondary'}
      disabled={isDisabled}
      onClick={handleVote}
      title={hasVoted ? "You have already voted on this proposal" : votingClosed ? "Voting is closed" : ""}
    >
      {isLoading ? 'Submitting...' : voteFor ? 'Vote For' : 'Vote Against'}
    </button>
  );
};