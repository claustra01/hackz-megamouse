import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const SignupTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SignupForm = styled.form`
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

const SignupButton = styled.button`
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

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const router = useRouter();

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
        // User created successfully, you can handle success here, e.g., show a success message, redirect to login, etc.
        router.push('/login'); // Redirect to login page after successful signup
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
    <SignupContainer>
      <SignupTitle>Signup</SignupTitle>
      <SignupForm onSubmit={handleSubmit}>
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
        <SignupButton type="submit">Signup</SignupButton>
        {responseMessage && <ErrorMessage>{responseMessage}</ErrorMessage>}
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;
