import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Header from '@/components/Header';

const Logout: React.FC = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(['token']);

  useEffect(() => {
    removeCookie('token');
    router.push('/');
  }, [removeCookie, router]);

  return <Header />
};

export default Logout;
