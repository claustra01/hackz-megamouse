// ScoreBoard.tsx
import UserCard from '@/components/UserCard';
import { Container, Title } from '@/styles/styledComponents';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Userdata = {
  id: number;
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
    <Container>
      <Title>Scoreboard</Title>
      {userDataList.map((user, index) => (
        <UserCard key={index} user={user} index={index} />
      ))}
    </Container>
  );
};

export default ScoreBoard;
