import cls from './header.module.scss';
import { useWalletDispatch, useWalletSelector } from '@/entities/wallet/lib/hooks';
import { createWallet, walletBalance } from '@/entities/wallet';
// get static props

export const Header = () => {
  const dispatch = useWalletDispatch();
  const balance = useWalletSelector(walletBalance);
  const handleCreateWallet = () => {
    dispatch(createWallet());
  };
  return (
    <header className={cls.header}>
      <button className="header_button" onClick={handleCreateWallet}>
        Создать кошелёк
      </button>
      <p>Баланс: {balance} SOL</p>
    </header>
  );
};
