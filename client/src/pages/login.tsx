import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

interface LoginResponse {
  token?: string;
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
      const response = await axios.post<LoginResponse>('/api/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const data = response.data;
        setCookie('token', data.token, { path: '/' });
        router.push('/');
      } else {
        setResponseMessage(`Login Failed: ${response.statusText}`);
      }
    } catch {
      setResponseMessage('Login Failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
};

export default Login;
