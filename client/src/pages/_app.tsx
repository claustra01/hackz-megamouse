// MyApp.tsx

import Header from '@/components/Header';
import { AuthProvider } from '../components/AuthContext';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Tektur', sans-serif;
  }

  /* その他のスタイルをここに追加できます */
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
