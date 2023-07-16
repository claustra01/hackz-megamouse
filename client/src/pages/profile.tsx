import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthContext';
import SolveCard from '@/components/SolveCard'; // SolveCardコンポーネントをインポート

type UserProfile = {
  username: string;
  email: string;
  profile: string;
  score: number;
  is_admin: boolean;
  created_at: string;
};

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
        const response = await axios.get('/api/auth/solves', {
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
    <div>
      <h1>{userProfile.username}'s Profile</h1>
      <p>Email: {userProfile.email}</p>
      <p>Username: {userProfile.username}</p>
      <p>Profile: {userProfile.profile}</p>
      <p>Score: {userProfile.score}</p>
      <p>Is Admin: {userProfile.is_admin ? 'Yes' : 'No'}</p>
      <p>Created At: {createdAtFormatted}</p>
      <button onClick={handleEditProfile}>Edit Profile</button>

      {/* SolveCardコンポーネントを表示 */}
      {solves.map((solve, index) => (
        <SolveCard key={index} solve={solve} />
      ))}
    </div>
  );
};

export default Profile;
