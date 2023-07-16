import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Next.jsのルーターをインポート
import { useAuth } from '@/components/AuthContext';

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
  const router = useRouter(); // Next.jsのルーターを使う

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${document.cookie.split('token=')[1]}`,
          },
        });

        if (response.status === 200) {
          setUserProfile(response.data);
        } else {
          router.push('/'); // リダイレクト処理
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        router.push('/'); // リダイレクト処理
      }
    };

    fetchUserProfile();
  }, [userId, router]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // 分単位で表示するために、created_atをDateオブジェクトに変換してからフォーマットする
  const createdAtFormatted = new Date(userProfile.created_at).toLocaleString();

  // ボタンクリック時のリダイレクト処理
  const handleEditProfile = () => {
    router.push('/profile/edit'); // リダイレクト処理
  };

  return (
    <div>
      <h1>{userProfile.username}'s Profile</h1>
      <p>Username: {userProfile.username}</p>
      <p>Profile: {userProfile.profile}</p>
      <p>Score: {userProfile.score}</p>
      <p>Email: {userProfile.email}</p>
      <p>Is Admin: {userProfile.is_admin ? 'Yes' : 'No'}</p>
      <p>Created At: {createdAtFormatted}</p>
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  );
};

export default Profile;
