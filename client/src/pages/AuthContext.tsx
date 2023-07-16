// AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';

type AuthStatus = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userId: number;
};

const initialAuthStatus: AuthStatus = {
  isLoggedIn: false,
  isAdmin: false,
  userId: 0,
};

const AuthContext = createContext<AuthStatus>(initialAuthStatus);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(initialAuthStatus);
  const [cookies] = useCookies(['token']); // トークンのCookieを取得

  useEffect(() => {
    // ここでCookieからトークンを取得してヘッダーに付与し、/authへのGETリクエストを行う
    const fetchAuthToken = async () => {
      try {
        if (cookies.token) {
          const response = await fetch('/api/auth', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${cookies.token}`, // トークンをヘッダーに付与
            },
          });

          if (response.status === 200) {
            const data = await response.json();

            setAuthStatus({
              isLoggedIn: true,
              isAdmin: data.is_admin,
              userId: data.id,
            });
          } else {
            setAuthStatus((prevStatus) => ({
              ...prevStatus,
              isLoggedIn: false,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };

    fetchAuthToken();
  }, [cookies.token]);

  // authStatusの変更を監視してコンソールに出力
  useEffect(() => {
    console.log('AuthStatus:', authStatus);
  }, [authStatus]);

  return (
    <AuthContext.Provider value={authStatus}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
