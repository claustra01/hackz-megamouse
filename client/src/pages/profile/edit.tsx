import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/components/AuthContext';

type UserProfile = {
  username: string;
  email: string;
  profile: string;
  password: string;
};

const ProfileEdit: React.FC = () => {
  const { userId } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string>('');

  const router = useRouter();
  const [cookies] = useCookies(['token']); // Cookieからトークンを取得

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);

        if (response.status === 200) {
          const { username, email, profile } = response.data;
          setUserProfile(response.data);
          setUsername(username);
          setEmail(email);
          setProfile(profile);
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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const handleSaveProfile = async () => {
    try {
      const api = axios.create({
        baseURL: '/api/auth/users',
        headers: {
          Authorization: `Bearer ${cookies.token}`, // トークンをリクエストヘッダーに付与
        },
      });

      const response = await api.put('', {
        username,
        email,
        profile,
        password,
      });

      if (response.status === 200) {
        // 保存成功時の処理
        console.log('Profile saved successfully!');
        router.push('/profile'); // 保存成功後に/profileにリダイレクト
      } else {
        setError(`Failed to save profile: ${response.data.message}`);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(`Failed to save profile: ${error.response.data.message}`);
      } else {
        setError('An error occurred while saving the profile.');
      }
    }
  };

  return (
    <div>
      <h1>{userProfile.username}'s Profile</h1>
      <div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Profile:</label>
          <input type="text" value={profile} onChange={(e) => setProfile(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {password === '' && <p>Password is required.</p>}
        </div>
        <button onClick={handleSaveProfile}>Save Profile</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileEdit;
