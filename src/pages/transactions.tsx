import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Transaction, SystemProgram, sendAndConfirmTransaction, Keypair } from '@solana/web3.js';
import cls from '@/shared/styles/transactions.module.scss';
import { useWalletSelector } from '@/entities/wallet/lib/hooks';

const Transactions = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const balance = useWalletSelector((state) => state.balance);
  const wallet = useWalletSelector((state) => state.wallet);

  const handleTransaction = async () => {
    if (!wallet) return;

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet.publicKey),
        toPubkey: new PublicKey(recipient),
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [Keypair.fromSecretKey(wallet.secretKey)]);
    console.log(`Transaction confirmed with signature: ${signature}`);
  };

  return (
    <div className={cls.container}>
      <header className={cls.header}>
        <button className={cls.button} onClick={() => window.history.back()}>Назад</button>
        <p>Баланс: {balance} SOL</p>
      </header>
      <main>
        <input
          type="text"
          placeholder="Количество SOL"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={cls.input}
        />
        <input
          type="text"
          placeholder="Адрес кошелька получателя"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={cls.input}
        />
        <button onClick={handleTransaction}>Отправить</button>
      </main>
    </div>
  );
};

export default Transactions;
