// /pages/profile/[userId].tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SolveCard from '@/components/SolveCard'; // SolveCardコンポーネントをインポート
import styled from 'styled-components';
import { Container, DataTable, Title } from '@/styles/styledComponents';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/components/AuthContext';

const SolvesContainer = styled.div`
  width: 400px; /* 解答一覧の幅を指定 */
`;

const SolvesTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;
const SwitchAdminButton = styled.button`
  width: 5px
  padding: 8px 16px;
  background-color: #ffac00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
`;

const AdminCell = styled.td`
  text-align: left;
`;

type UserProfile = {
  username: string;
  profile: string;
  score: number;
  is_admin: boolean;
  created_at: string;
};

const UserProfilePage: React.FC = () => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const { userId } = router.query; // パスパラメータからuserIdを取得
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [solves, setSolves] = useState<any[]>([]); // Solveデータを保持するstate
  const [cookies] = useCookies(['token']); // Cookieからトークンを取得

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);

        if (response.status === 200) {
          setUserProfile(response.data);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        router.push('/');
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, router]);

  useEffect(() => {
    const fetchSolves = async () => {
      try {
        const response = await axios.get(`/api/auth/solves/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        if (response.status === 200) {
          setSolves(response.data);
        } else {
          console.error('Error fetching solves:', response.data);
        }
      } catch (error) {
        console.error('Error fetching solves:', error);
      }
    };

    if (userId) {
      fetchSolves();
    }
  }, [userId, cookies.token]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const switchAdmin = async () => {
    try {
      const response = await axios.put(`/api/auth/users/admin/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      if (response.status === 200) {
        console.log("switch success")
        router.push(`/profile/${userId}`); // リダイレクト
      } else {
        console.error('Error fetching user:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };



  const createdAtFormatted = new Date(userProfile.created_at).toLocaleString();

  return (
    <Container>
      <Title>{userProfile.username}&apos;s Profile</Title>
      <DataTable>
        <table>
          <tr>
            <td>Username</td>
            <td>{userProfile.username}</td>
          </tr>
          <tr>
            <td>Profile</td>
            <td>{userProfile.profile}</td>
          </tr>
          <tr>
            <td>Score</td>
            <td>{userProfile.score}</td>
          </tr>
          <tr>
            <td>Admin</td>
            <td>{userProfile.is_admin ? 'Yes' : 'No'}</td>
            {isAdmin &&
              <>
                <AdminCell></AdminCell>
                <td>
                  <SwitchAdminButton onClick={switchAdmin}>switch</SwitchAdminButton>

                </td>
              </>}
          </tr>
          <tr>
            <td>Since</td>
            <td>{createdAtFormatted}</td>
          </tr>
        </table>
      </DataTable>

      <SolvesContainer>
        <SolvesTitle>Solves List</SolvesTitle>
        {solves && solves.map((solve, index) => (
          <SolveCard key={index} solve={solve} />
        ))}
      </SolvesContainer>
    </Container>
  );
};

export default UserProfilePage;
