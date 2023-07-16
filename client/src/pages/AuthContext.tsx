import { createContext, useContext, useState, ReactNode } from 'react';

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
  children: ReactNode; // childrenの型を追加
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(initialAuthStatus);

  return (
    <AuthContext.Provider value={authStatus}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
