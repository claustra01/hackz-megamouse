import React from 'react';

type UserScore = {
  id: number
  name: string
  score: number
}

const ScoreList = (score: UserScore[]) => {
  return (
    <div className="score-list">
      <h2>score List</h2>
      <ul>
        {score.map((score, index) => (
          <li key={score.id}>
            <span className="rank">{index + 1}</span>
            <span className="name">{score.name}</span>
            <span className="score">{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreList;
