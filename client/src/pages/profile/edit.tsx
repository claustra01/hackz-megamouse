import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/components/AuthContext';
import { Container, Title, Button, ErrorMessage, DataTable } from '@/styles/styledComponents';
import styled from 'styled-components';

type UserProfile = {
  username: string;
  email: string;
  profile: string;
  password: string;
};

const Input = styled.input`
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
`;

const ProfileEdit: React.FC = () => {
  const { userId } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string>('');

  const router = useRouter();
  const [cookies] = useCookies(['token']);

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
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      const response = await api.put('', {
        username,
        email,
        profile,
        password,
      });

      if (response.status === 200) {
        console.log('Profile saved successfully!');
        router.push('/profile');
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
    <Container>
      <Title>Edit Profile</Title>
      <DataTable>
        <table>
          <tr>
            <td>Email</td>
            <td>
              <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Profile</td>
            <td>
              <Input type="text" value={profile} onChange={(e) => setProfile(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </td>
          </tr>
        </table>
      </DataTable>
      <Button onClick={handleSaveProfile}>Save Profile</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default ProfileEdit;
