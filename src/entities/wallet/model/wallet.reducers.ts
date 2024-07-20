import { Keypair } from '@solana/web3.js';
import { WalletActionTypes, CREATE_WALLET, SET_BALANCE, SET_WALLET } from './wallet.types';

interface WalletState {
  wallet: { publicKey: string; secretKey: string } | null;
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
          // Convert Uint8Array to a base64 string
          secretKey: Buffer.from(keypair.secretKey).toString('base64'),
        },
      };
    case SET_WALLET:
      return {
        ...state,
        wallet: action.payload
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
