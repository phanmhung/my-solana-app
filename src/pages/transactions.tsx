import React, { FormEvent, useState } from 'react';
import cls from '@/shared/styles/transactions.module.scss';
import {
  useWalletDispatch,
  useWalletSelector,
} from '@/entities/wallet/lib/hooks';
import { Header } from '@/features/header';
import { Button } from '@/shared/ui/button';
import { sendSol } from '@/entities/wallet';

export default function Transactions() {
  const wallet = useWalletSelector((state) => state.wallet);
  const [amount, setAmount] = useState('');
  const [toPublicKey, setToPublicKey] = useState('');
  const dispatch = useWalletDispatch();

  const validateAmount = (amount: string): boolean => {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
  };

  const handleTransaction = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateAmount(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    dispatch(sendSol(toPublicKey, parseFloat(amount)));
  };

  return (
    <>
      <Header />
      <main className={cls.container}>
        <label>To Public Key:</label>
        <input
          type="text"
          value={toPublicKey}
          onChange={(e) => setToPublicKey(e.target.value)}
          placeholder="Recipient's Public Key"
          className={cls.input}
        />
        <label>Amount (SOL):</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className={cls.input}
        />
        <Button onClick={handleTransaction}>Send</Button>
      </main>
    </>
  );
};

