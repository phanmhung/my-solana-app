import { walletWrapper } from '@/entities/wallet';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default walletWrapper.withRedux(MyApp);
