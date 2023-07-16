import React from 'react';
import ChallengeCard from './Challenge';
import { Challenge } from '../lib/contents';

interface datalist {
  datalist: Challenge[]
}

const Challengelist = ({ datalist }: datalist) => {
  return (
    datalist.map(data => (
      <ChallengeCard data={data} />
    ))
  )
}

export default Challengelist;