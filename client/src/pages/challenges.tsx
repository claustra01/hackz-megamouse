import Link from 'next/link';
import Header from '../components/Header';
import ChallengeList from '../components/ChallengeList';

const response = [
  { title: 'Card 1', category: 'web', description: 'Description 1', value: 500 },
  { title: 'Card 2', category: 'web', description: 'Description 2', value: 400 },
  { title: 'Card 3', category: 'web', description: 'Description 3', value: 100 },
];

const Challenges = () => {
  return (
    <div>
      <Header />
      <h2>challenges</h2>
      <ChallengeList datalist={response} />
    </div>
  );
};

export default Challenges;
