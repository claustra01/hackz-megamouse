import React from 'react';

// const Card = (title: string, category: string, description: string, value: number) => {
const ChallengeCard = () => {
  return (
    <div className="card">
      <div className="card-content">
        {/* <h2 className="card-title">{title}</h2>
        <p className="card-category">{category}</p>
        <p className="card-description">{description}</p>
        <p className="card-value">{value}</p> */}
        <h2 className="card-title">title</h2>
        <p className="card-category">category</p>
        <p className="card-description">description</p>
        <p className="card-value">value</p>
      </div>
    </div>
  );
};

export default ChallengeCard;
