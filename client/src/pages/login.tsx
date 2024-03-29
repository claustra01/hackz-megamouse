import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Button, ErrorMessage, Form, FormField, Container, Title } from '@/styles/styledComponents';

interface ApiResponse {
  token?: string;
  message?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [cookies, setCookie] = useCookies(['token']);
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        if (response.data && response.data.message) {
          setResponseMessage(`Login Failed: ${response.data.message}`);
        } else {
          setResponseMessage(`Login Failed: ${response.statusText}`);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage(`Login Failed: ${error.response.data.message}`);
      } else {
        setResponseMessage('Login Failed');
      }
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </FormField>
        <FormField>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </FormField>
        <Button type="submit">Login</Button>
        {responseMessage && <ErrorMessage>{responseMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default Login;
