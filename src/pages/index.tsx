import CopyIcon from '~/assets/copy_icon.svg';
import { walletWrapper } from '@/entities/wallet';
import { useWalletSelector } from '@/entities/wallet/lib/hooks';
import { Header } from '@/features/header';
import cls from '@/shared/styles/home.module.scss';

export const getStaticProps = walletWrapper.getStaticProps(
  (store) =>
    ({ preview }) => {
      return {
        props: {},
      };
    }
);
interface IHomeProps {
  balance: number;
}
export default function Home(props: IHomeProps) {
  const { balance } = props;
  const wallet = useWalletSelector((state) => state.wallet);
  const displayWallet =
    wallet &&
    wallet.publicKey
      // display only 4 first and 4 last characters
      .replace(
        /^(.{4})(.*)(.{4})$/,
        (_, first, middle, last) => `${first}...${last}`
      );
  return (
    <div>
      <Header />
      {balance}
      <main className={cls.main_wrapper}>
        <div className={cls.wallet_info}>
          <p className={cls.wallet_info_address_label}>Address:</p>
          <div className={cls.wallet_info_address}>
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
            {wallet ? wallet.secretKey : 'Your private key will appear here'}
          </p>
        </div>
      </main>
    </div>
  );
}
