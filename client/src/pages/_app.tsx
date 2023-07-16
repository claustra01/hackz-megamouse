import { AuthProvider } from './AuthContext'; // 同じディレクトリにあるAuthContextをインポート
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
