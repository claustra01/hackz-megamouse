import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface ApiResponse {
  token?: string;
  message?: string;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const LoginTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  & label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  & input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #66b2ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Tektur', sans-serif;

  &:hover {
    background-color: #4682b4;
  }

  &:focus {
    outline: none;
  }
`;

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
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <FormField>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </FormField>
        <FormField>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </FormField>
        <LoginButton type="submit">Login</LoginButton>
        {responseMessage && <ErrorMessage>{responseMessage}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
