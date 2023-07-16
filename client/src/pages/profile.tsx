import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthContext';
import SolveCard from '@/components/SolveCard'; // SolveCardコンポーネントをインポート
import styled from 'styled-components';

type UserProfile = {
  username: string;
  email: string;
  profile: string;
  score: number;
  is_admin: boolean;
  created_at: string;
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const ProfileHeader = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* タイトルとコンテンツの間に余白を追加 */
`;

const EditProfileButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #66b2ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4682b4;
  }

  &:focus {
    outline: none;
  }
`;

const SolvesContainer = styled.div`
  width: 400px; /* 解答一覧の幅を指定 */
`;

const SolvesTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Profile: React.FC = () => {
  const { userId } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [solves, setSolves] = useState<any[]>([]); // Solveデータを保持するstate
  const router = useRouter();

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

    fetchUserProfile();
  }, [userId, router]);

  useEffect(() => {
    const fetchSolves = async () => {
      try {
        const response = await axios.get(`/api/auth/solves/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${document.cookie.split('token=')[1]}`,
          },
        });

        if (response.status === 200) {
          setSolves(response.data.reverse()); // solvesを逆順にする
        } else {
          console.error('Error fetching solves:', response.data);
        }
      } catch (error) {
        console.error('Error fetching solves:', error);
      }
    };

    fetchSolves();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const createdAtFormatted = new Date(userProfile.created_at).toLocaleString();

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  return (
    <ProfileContainer>
      <ProfileHeader>{userProfile.username}'s Profile</ProfileHeader>
      <ProfileData>
        <p>Email: {userProfile.email}</p>
        <p>Username: {userProfile.username}</p>
        <p>Profile: {userProfile.profile}</p>
        <p>Score: {userProfile.score}</p>
        <p>Is Admin: {userProfile.is_admin ? 'Yes' : 'No'}</p>
        <p>Created At: {createdAtFormatted}</p>
        <EditProfileButton onClick={handleEditProfile}>Edit Profile</EditProfileButton>
      </ProfileData>

      <SolvesContainer>
        <SolvesTitle>Solves List</SolvesTitle>
        {solves.map((solve, index) => (
          <SolveCard key={index} solve={solve} />
        ))}
      </SolvesContainer>
    </ProfileContainer>
  );
};

export default Profile;
