import { walletWrapper } from "@/entities/wallet";
import { useWalletSelector } from "@/entities/wallet/lib/hooks";
import { Header } from "@/features/header";
import cls from '@/shared/styles/home.module.scss'

export const getStaticProps = walletWrapper.getStaticProps(store=> ({ preview }) => {
  return {
    props: {
    },
  };
}
);
interface IHomeProps {
  balance:number;
}
export default function Home(props: IHomeProps) {
  const { balance } = props;
  const wallet = useWalletSelector((state) => state.wallet);

  return (
    <div>
      <Header/>
      {balance}
      <main>
        {wallet && (
          <div>
            <p>Адрес кошелька: {wallet.publicKey}</p>
            <p>Private Key: {wallet.secretKey.toString()}</p>
          </div>
        )}
      </main>
    </div>
  );
}
