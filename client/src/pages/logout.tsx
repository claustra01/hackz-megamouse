import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/components/AuthContext';

const Logout: React.FC = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(['token']);
  const { updateAuthStatus } = useAuth();

  useEffect(() => {
    removeCookie('token');
    updateAuthStatus({
      isLoggedIn: false,
      isAdmin: false,
      userId: 0,
    });
    router.push('/');
  }, [removeCookie, router, updateAuthStatus]);

  return null
};

export default Logout;
