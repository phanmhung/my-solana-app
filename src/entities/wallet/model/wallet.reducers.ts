import { Keypair } from '@solana/web3.js';
import { WalletActionTypes, CREATE_WALLET, SET_BALANCE } from './wallet.types';

interface WalletState {
  wallet: { publicKey: string; secretKey: Uint8Array } | null;
  balance: number;
}

const initialState: WalletState = {
  wallet: null,
  balance: 0,
};

const walletReducer = (state = initialState, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case CREATE_WALLET:
      const keypair = Keypair.generate();
      return {
        ...state,
        wallet: {
          publicKey: keypair.publicKey.toBase58(),
          secretKey: keypair.secretKey,
        },
      };
    case SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};

export default walletReducer;
