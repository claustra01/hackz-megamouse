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

const AuthContext = createContext<AuthStatus & { updateAuthStatus: (newStatus: AuthStatus) => void }>({
  ...initialAuthStatus,
  updateAuthStatus: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(initialAuthStatus);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        if (cookies.token) {
          const response = await fetch('/api/auth', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${cookies.token}`,
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
              isLoggedIn: false,
              isAdmin: false,
              userId: 0,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };

    fetchAuthToken();
  }, [cookies.token]);

  // Function to update authStatus
  const updateAuthStatus = (newStatus: AuthStatus) => {
    setAuthStatus(newStatus);
  };

  return (
    <AuthContext.Provider value={{ ...authStatus, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
