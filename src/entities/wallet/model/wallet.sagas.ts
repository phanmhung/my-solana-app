import { call, put, takeEvery, select } from 'redux-saga/effects';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { setBalance, setWallet } from './wallet.actions';
import { CREATE_WALLET, LOAD_WALLET, REQUEST_AIRDROP, SEND_SOL, SendSolAction, WalletActionTypes } from './wallet.types';
import connection from '../lib/connection';

function* createWalletSaga(): Generator<any, void, any> {
  const wallet = yield select((state: any) => state.wallet.wallet);
  if (wallet) {
    const walletBalance = yield call([connection, connection.getBalance], new PublicKey(wallet.publicKey));
    yield put(setBalance(walletBalance / LAMPORTS_PER_SOL));
    yield call(subscribeToAccountChangesSaga);
    return;
  }
}

import { EventEmitter } from 'events';
const balanceUpdateEmitter = new EventEmitter();

function* subscribeToAccountChangesSaga(): Generator<any, void, any> {
  const publicKey = yield select((state: any) => state.wallet.publicKey);

  try {
    // Subscribe to account changes
    connection.onAccountChange(new PublicKey(publicKey), (accountInfo) => {
      const walletBalance = accountInfo.lamports / LAMPORTS_PER_SOL;
      balanceUpdateEmitter.emit('balanceUpdated', walletBalance);
      console.log('Balance updated:', walletBalance);
    });

    while (true) {
      const walletBalance = yield call(() => new Promise(resolve => balanceUpdateEmitter.once('balanceUpdated', resolve)));
      yield put(setBalance(walletBalance));
    }
  } catch (error) {
    console.error('Failed to subscribe to account changes:', error);
  }
}
function* sendSolSaga(action: SendSolAction): Generator<any, void, any> {
  const { toPublicKey, amount } = action.payload;
  const wallet = yield select((state) => state.wallet);

  if (wallet === null) {
    console.error('Wallet is not defined');
    return;
  }


  const fromKeypair = Keypair.fromSecretKey(new Uint8Array(Buffer.from(wallet.secretKey, 'base64')));
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: new PublicKey(toPublicKey),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  try {
    // Create a recent blockhash to include in the transaction
    const { blockhash } = yield call([connection, 'getRecentBlockhash']);
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromKeypair.publicKey;

    // Sign the transaction
    transaction.sign(fromKeypair);

    // Send the transaction with the signature
    const signature = yield call([connection, connection.sendRawTransaction], transaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    // Confirm the transaction
    yield call([connection, connection.confirmTransaction], signature, 'confirmed');
    console.log('Transaction successful with signature:', signature);

  } catch (error) {
    alert('Transaction failed. Please check the console for more details.'
    );
    console.error('Transaction failed', error);
  }
}

function* requestAirdropSaga(): Generator<any, void, any> {


  try {
    const state = yield select((state: any) => state.wallet);

    // Use the provided public key string or get it from the state
    const pubKeyString = state.publicKey;

    if (!pubKeyString) {
      throw new Error('Public key is undefined');
    }

    // Validate that the public key string is not undefined and convert it to a PublicKey
    const publicKey = new PublicKey(pubKeyString);

    const signature = yield call([connection, connection.requestAirdrop], publicKey, 2 * LAMPORTS_PER_SOL); // Request 2 SOL
    yield call([connection, connection.confirmTransaction], signature, 'confirmed');
    console.log('Airdrop successful with signature:', signature);

  } catch (error) {
    console.error('Airdrop failed:', error);
  }
}

function* loadWalletSaga(): Generator<any, void, any> {
  const walletDataString = localStorage.getItem('solanaWallet');

  const walletData = walletDataString ? JSON.parse(walletDataString) : null;

  if (walletData && walletData.publicKey && walletData.secretKey) {
    yield put(setWallet(walletData.publicKey, walletData.secretKey));
    const walletBalance = yield call([connection, connection.getBalance], new PublicKey(walletData.publicKey));
    yield put(setBalance(walletBalance / LAMPORTS_PER_SOL));
    yield call(subscribeToAccountChangesSaga);
  }
}

function* walletSaga() {
  yield takeEvery<WalletActionTypes>(CREATE_WALLET, createWalletSaga);
  yield takeEvery(SEND_SOL, sendSolSaga);
  yield takeEvery<WalletActionTypes>(REQUEST_AIRDROP, requestAirdropSaga);
  yield takeEvery(LOAD_WALLET, loadWalletSaga);
}

export default walletSaga;
