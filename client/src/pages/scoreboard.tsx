import UserCard from '@/components/UserCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Userdata = {
  id: number;
  username: string;
  profile: string;
  score: number;
};

const ScoreBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const ScoreBoardTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

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
    <ScoreBoardContainer>
      <ScoreBoardTitle>Scoreboard</ScoreBoardTitle>
      {userDataList.map((user, index) => (
        <UserCard key={index} user={user} index={index} />
      ))}
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;
