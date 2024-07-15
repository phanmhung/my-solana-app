import { call, put, takeEvery, select } from 'redux-saga/effects';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { setBalance } from './wallet.actions';
import { CREATE_WALLET, WalletActionTypes } from './wallet.types';

function* createWalletSaga(): Generator<any, void, any> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const wallet = yield select((state: any) => state.wallet.wallet);
  if (wallet) {
    const walletBalance = yield call([connection, connection.getBalance], new PublicKey(wallet.publicKey));
    yield put(setBalance(walletBalance / 1e9));
  }
}

function* walletSaga() {
  yield takeEvery<WalletActionTypes>(CREATE_WALLET, createWalletSaga);
}

export default walletSaga;
