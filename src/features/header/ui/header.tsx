import cls from './header.module.scss';
import {
  useWalletDispatch,
  useWalletSelector,
} from '@/entities/wallet/lib/hooks';
import { createWallet, walletBalance } from '@/entities/wallet';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const dispatch = useWalletDispatch();
  const balance = useWalletSelector(walletBalance);
  const handleCreateWallet = () => {
    dispatch(createWallet());
  };
  const wallet = useWalletSelector((state) => state.wallet);
  const router = useRouter();
  return (
    <header className={cls.header}>
      <ul className={cls.header_navbar}>
        {!wallet ? (
          <Button id="header_button" onClick={handleCreateWallet}>
            Create wallet
          </Button>
        ) : router.pathname === '/transactions' ? (
          /* Show Transaction or Go Back button based on current page */

          <li>
            <Link href="/">Go Back</Link>
          </li>
        ) : (
          <li>
            <Link href="/transactions">Transactions</Link>
          </li>
        )}
      </ul>

      <p>Balance: {balance} SOL</p>
    </header>
  );
};
