import UserCard from '@/components/UserCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Userdata = {
  username: string;
  profile: string;
  score: number;
};

const ScoreBoard = () => {

  const [userDataList, setUserDataList] = useState<Userdata[]>([]);

  useEffect(() => {
    // APIからデータを取得する関数を定義
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        setUserDataList(response.data); // 取得したデータをstateにセット
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // データの取得を実行
  }, []);

  return (
    <div>
      {userDataList.map((user, index) => (
        <UserCard key={index} user={user} index={index} />
      ))}
    </div>
  );
};

export default ScoreBoard;
