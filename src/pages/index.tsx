import React from 'react';
import CopyIcon from '~/assets/copy_icon.svg';
import {
  useWalletDispatch,
  useWalletSelector,
} from '@/entities/wallet/lib/hooks';
import { Header } from '@/features/header';
import cls from '@/shared/styles/home.module.scss';
import { requestAirdrop } from '@/entities/wallet';
import { Button } from '@/shared/ui/button';

export default function Home() {
  const wallet = useWalletSelector((state) => state.wallet);
  const dispatch = useWalletDispatch();
  const displayWallet =
    wallet &&
    wallet.publicKey
      // display only 4 first and 4 last characters
      .replace(
        /^(.{4})(.*)(.{4})$/,
        (_, first, middle, last) => `${first}...${last}`
      );

  const handleRequestAirdrop = () => {
    dispatch(requestAirdrop());
  };

  return (
    <div>
      <Header />
      <main className={cls.main_wrapper}>
        {wallet && (
          <Button onClick={handleRequestAirdrop} className={cls.airdrop_button}>
            Request Airdrop
          </Button>
        )}
        <div className={cls.wallet_info}>
          <p className={cls.wallet_info_address_label}>Address:</p>
          <div
            className={cls.wallet_info_address}
            title="Click to copy to copy full public key"
          >
            {wallet ? displayWallet : 'Your wallet address will appear here'}
            {wallet && (
              <button
                className={cls.copy_button}
                onClick={() => navigator.clipboard.writeText(wallet.publicKey)}
              >
                <CopyIcon />
              </button>
            )}
          </div>
          <p className={cls.wallet_info_private_label}>Private Key:</p>
          <p className={cls.wallet_info_private}>
            {/* private key format [57,155,26,106,...]*/}
            {wallet ? wallet.secretKey : 'Your private key will appear here'}
          </p>
        </div>
      </main>
    </div>
  );
}
