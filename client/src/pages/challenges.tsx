import Link from 'next/link';
import Header from './components/Header';
import ChallengeList from './components/ChallengeList';

const Challenges = () => {
  return (
    <div>
      <Header />
      <h2>challenges</h2>
      <ChallengeList />
    </div>
  );
};

export default Challenges;
