import cls from './header.module.scss';
import { useWalletDispatch, useWalletSelector } from '@/entities/wallet/lib/hooks';
import { createWallet, walletBalance } from '@/entities/wallet';
import { Button } from '@/shared/ui/button';
// get static props

export const Header = () => {
  const dispatch = useWalletDispatch();
  const balance = useWalletSelector(walletBalance);
  const handleCreateWallet = () => {
    dispatch(createWallet());
  };
  return (
    <header className={cls.header}>
      <Button id="header_button" onClick={handleCreateWallet}>
        Create wallet
      </Button>
      <p>Balance: {balance} SOL</p>
    </header>
  );
};
