import React from 'react';
import ChallengeCard from './Challenge';

const Challengelist = ({ data }: any) => {
  return (
    data.map((item, index) => (
      <div key={index}>
        <ChallengeCard data={item} />
      </div>
    ))
  )
}

export default Challengelist;