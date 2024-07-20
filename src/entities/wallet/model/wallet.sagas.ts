import { call, put, takeEvery, select } from 'redux-saga/effects';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { setBalance } from './wallet.actions';
import { CREATE_WALLET, REQUEST_AIRDROP, SEND_SOL, SendSolAction, WalletActionTypes } from './wallet.types';

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
  const wallet = yield select((state) => state.wallet);

  if (wallet === null) {
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
    alert('Transaction failed. Please check the console for more details.'
    );
    console.error('Transaction failed', error);
  }
}

function* requestAirdropSaga(): Generator<any, void, any> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Retrieve the current state of the wallet
    const state= yield select((state: any) => state.wallet);

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

    // Update balance after airdrop
    yield call(fetchBalanceSaga, publicKey.toBase58());
  } catch (error) {
    console.error('Airdrop failed:', error);
  }
}

function* walletSaga() {
  yield takeEvery<WalletActionTypes>(CREATE_WALLET, createWalletSaga);
  yield takeEvery(SEND_SOL, sendSolSaga);
  yield takeEvery(REQUEST_AIRDROP, requestAirdropSaga);
}

export default walletSaga;
