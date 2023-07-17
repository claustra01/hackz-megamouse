import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import styled from 'styled-components';
import ChallengeList from '../components/ChallengeList';

const ChallengesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8; /* 雰囲気に合った色 */
  padding: 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  background-color: #ffac00; /* 雰囲気に合った色 */
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Challenges = () => {
  const { isAdmin } = useAuth();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/auth/challenges', {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const data = response.data;
        console.log(data)
        // レスポンスデータの処理
        if (data != null) {
          setData(data);
          const fetchedcategories = data.map((arr) => arr[0].category);
          setCategories(fetchedcategories)
        } else {
          const nulldata = [
            [
              {
                "id": 100000,
                "title": "none",
                "category": "none",
                "description": "description",
                "filepath": "file",
                "connection_info": "hoge",
                "value": 0,
                "is_visible": false,
              }
            ]
          ]
          setData(nulldata);
        }

        // レスポンスデータの処理
        const fetchedCategories = data.map((arr) => arr[0].category);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error:', error.message);
        // エラーハンドリング
      }
    };

    fetchData();
  }, []);

  return (
    <ChallengesContainer>
      {data.map((item, index) => (
        <CategoryContainer key={index}>
          <CategoryTitle>{categories[index]}</CategoryTitle>
          <ChallengeList data={item} />
        </CategoryContainer>
      ))}
    </ChallengesContainer>
  );
};

export default Challenges;
