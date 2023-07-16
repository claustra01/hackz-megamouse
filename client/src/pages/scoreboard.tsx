import Link from 'next/link';
import Header from '../components/Header';
import { UserScore } from '../lib/contents';
import ScoreList from '../components/ScoreList';

const data: UserScore[] = [
  { id: 1, name: "hoge", score: 500 },
  { id: 1, name: "hoge", score: 500 },
  { id: 1, name: "hoge", score: 500 },
]
const Scoreboard = () => {
  return (
    <div>
      <Header />
      <h2>scoreboard</h2>
      <ScoreList scores={data} />
    </div>
  );
};

export default Scoreboard;
