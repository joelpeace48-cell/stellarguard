import React from 'react';
import { formatAddress } from '@/lib/formatters';

interface TreasuryCardProps {
  txId: number;
  to: string;
  amount: number;
  memo: string;
  approvals: string[];
  threshold: number;
  executed: boolean;
  onApprove?: () => void;
  onExecute?: () => void;
}

export const TreasuryCard: React.FC<TreasuryCardProps> = ({
  txId,
  to,
  amount,
  memo,
  approvals,
  threshold,
  executed,
  onApprove,
  onExecute
}) => {
  const isReadyToExecute = approvals.length >= threshold;

  return (
    <div className="card p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-white">Tx #{txId}</h3>
        {executed && <span className="badge badge-executed">Executed</span>}
      </div>
      
      <p className="text-gray-300 text-sm">To: <span className="font-mono">{formatAddress(to)}</span></p>
      <p className="text-gray-300 text-sm">Amount: <strong className="text-white">{amount} XLM</strong></p>
      {memo && <p className="text-gray-400 text-sm italic mt-1 font-mono">Memo: {memo}</p>}
      
      <div className="mt-5 flex items-center justify-between border-t border-gray-700 pt-4">
        {/* Signer threshold context layout */}
        <div className="bg-gray-800 rounded px-3 py-1 font-mono text-sm border border-gray-700 shadow-sm">
          Approvals:{' '}
          <span className={isReadyToExecute ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
            {approvals.length}
          </span>
          {' '}/ <span className="text-gray-400">{threshold}</span>
        </div>
        
        {!executed && (
          isReadyToExecute ? (
            <button className="btn-primary" onClick={onExecute}>Execute</button>
          ) : (
            <button className="btn-secondary" onClick={onApprove}>Approve</button>
          )
        )}
      </div>
    </div>
  );
};