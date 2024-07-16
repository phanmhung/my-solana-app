import { walletWrapper } from '@/entities/wallet';
import type { AppProps } from 'next/app';
import '@/shared/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default walletWrapper.withRedux(MyApp);
