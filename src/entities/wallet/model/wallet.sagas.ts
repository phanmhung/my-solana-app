import { call, put, takeEvery, select } from 'redux-saga/effects';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { setBalance } from './wallet.actions';
import { CREATE_WALLET, SEND_SOL, SendSolAction, WalletActionTypes } from './wallet.types';
import { walletState } from './wallet.store';

function* createWalletSaga(): Generator<any, void, any> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const wallet = yield select((state: any) => state.wallet.wallet);
  if (wallet) {
    const walletBalance = yield call([connection, connection.getBalance], new PublicKey(wallet.publicKey));
    yield put(setBalance(walletBalance / 1e9));
  }
}

// Generator function to fetch balance
function* fetchBalanceSaga(publicKeyString: string): Generator<any, void, any> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const publicKey = new PublicKey(publicKeyString);
  const walletBalance = yield call([connection, connection.getBalance], publicKey);
  yield put(setBalance(walletBalance / 1e9)); // Convert lamports to SOL
}

function* sendSolSaga(action: SendSolAction): Generator<any, void, any> {
  const { toPublicKey, amount } = action.payload;
  const state: walletState = yield select((state: any) => state.wallet);
  const { wallet } = state;

  if (!wallet) {
    console.error('Wallet is not defined');
    return;
  }

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const fromKeypair = Keypair.fromSecretKey(new Uint8Array(Buffer.from(wallet.secretKey, 'base64')));
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: new PublicKey(toPublicKey),
      lamports: amount * 1e9, // Convert SOL to lamports
    })
  );

  try {
    // Create a recent blockhash
    const { blockhash } = yield call([connection, 'getRecentBlockhash']);
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromKeypair.publicKey;

    // Sign the transaction
    transaction.sign(fromKeypair);

    // Send the transaction
    const signature = yield call([connection, connection.sendRawTransaction], transaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    // Confirm the transaction
    yield call([connection, connection.confirmTransaction], signature, 'confirmed');
    console.log('Transaction successful with signature:', signature);

    // Update balance after transaction
    yield call(fetchBalanceSaga, fromKeypair.publicKey.toBase58());
  } catch (error) {
    console.error('Transaction failed', error);
  }
}

function* walletSaga() {
  yield takeEvery<WalletActionTypes>(CREATE_WALLET, createWalletSaga);
  yield takeEvery(SEND_SOL, sendSolSaga);
}

export default walletSaga;
