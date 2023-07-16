import { UserScore } from '../lib/contents';
import React from 'react';

interface UserscoreProps {
  scores: UserScore[]
}
const ScoreList = ({ scores }: UserscoreProps) => {
  return (
    <div className="score-list">
      <h2>score List</h2>
      <ul>
        {scores.map((score: UserScore, index: number) => (
          <ul key={score.id}>
            <span className="rank">{index + 1}</span>
            <span className="name">{score.name}</span>
            <span className="score">{score.score}</span>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default ScoreList;
