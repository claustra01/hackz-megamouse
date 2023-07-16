import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const Logout: React.FC = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(['token']);

  useEffect(() => {
    // コンポーネントがマウントされたときに実行される処理
    // tokenという名前のcookieを削除してトップページにリダイレクトする
    removeCookie('token');
    router.push('/');
  }, [removeCookie, router]);

  return null; // 何も表示しないため、nullを返す
};

export default Logout;
