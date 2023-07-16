import { AuthProvider } from '../components/AuthContext';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

// グローバルスタイルとして定義
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
