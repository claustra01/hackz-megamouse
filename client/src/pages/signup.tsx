import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Title, Form, FormField, Button, ErrorMessage, Container } from '@/styles/styledComponents';

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
