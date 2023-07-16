import React from 'react';

type Solve = {
  challenge_id: number;
  category: string;
  value: number;
  created_at: string;
};

const SolveCard: React.FC<{ solve: Solve }> = ({ solve }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p style={{ flex: 1 }}>Challenge ID: {solve.challenge_id}</p>
      <p style={{ flex: 1 }}>Category: {solve.category}</p>
      <p style={{ flex: 1 }}>Value: {solve.value}</p>
      <p style={{ flex: 1 }}>Created At: {new Date(solve.created_at).toLocaleString()}</p>
    </div>
  );
};

export default SolveCard;
