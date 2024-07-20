import { walletWrapper } from '@/entities/wallet';
import type { AppProps } from 'next/app';
import '@/shared/styles/globals.css';
import React from 'react';
import { useWalletDispatch } from '@/entities/wallet/lib/hooks';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useWalletDispatch();
  // load wallet from local storage
  React.useEffect(() => {
    dispatch({ type: 'LOAD_WALLET' });
  }, [dispatch]);
  return <Component {...pageProps} />;
}

export default walletWrapper.withRedux(MyApp);
