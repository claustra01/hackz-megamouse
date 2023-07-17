import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Title, Form, FormField, Button, ErrorMessage, Container } from '@/styles/styledComponents';
import { useCookies } from 'react-cookie';

interface ApiResponse {
  token?: string;
  message?: string;
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);


  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // try login after successful signup
        try {
          const response = await axios.post<ApiResponse>('/api/login', {
            email,
            password,
          });
    
          if (response.status === 200 && response.data.token) {
            const data = response.data;
            setCookie('token', data.token, { path: '/' });
            router.push('/');
          } else {
            router.push('/login');
          }
        } catch (error) {
          router.push('/login');
        }
      } else {
        if (response.data && response.data.message) {
          setResponseMessage(`Signup Failed: ${response.data.message}`);
        } else {
          setResponseMessage(`Signup Failed: ${response.statusText}`);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage(`Signup Failed: ${error.response.data.message}`);
      } else {
        setResponseMessage('Signup Failed');
      }
    }
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </FormField>
        <FormField>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </FormField>
        <FormField>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </FormField>
        <Button type="submit">Signup</Button>
        {responseMessage && <ErrorMessage>{responseMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default Signup;
