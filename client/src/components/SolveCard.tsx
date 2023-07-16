import React from 'react';
import styled from 'styled-components';

type Solve = {
  challenge_id: number;
  category: string;
  value: number;
  created_at: string;
};

const SolveCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const SolveInfo = styled.p`
  flex: 1;
`;

const SolveCard: React.FC<{ solve: Solve }> = ({ solve }) => {
  return (
    <SolveCardContainer>
      <SolveInfo>Challenge {solve.challenge_id}</SolveInfo>
      <SolveInfo>[{solve.category}]</SolveInfo>
      <SolveInfo>{solve.value}pt</SolveInfo>
      <SolveInfo>{new Date(solve.created_at).toLocaleString()}</SolveInfo>
    </SolveCardContainer>
  );
};

export default SolveCard;
