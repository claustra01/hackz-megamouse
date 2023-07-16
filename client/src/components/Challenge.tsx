import { Challenge } from '../lib/contents';
import React from 'react';

interface ChallengeProps {
  data: Challenge
}

const ChallengeCard = ({ data }: ChallengeProps) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-description">{data.description}</p>
        <p className="card-value">{data.value}</p>
      </div>
    </div>
  );
};

export default ChallengeCard;
