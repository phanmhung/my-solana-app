export const CREATE_WALLET = 'CREATE_WALLET';
export const SET_BALANCE = 'SET_BALANCE';
export const SEND_SOL = 'SEND_SOL';
export const REQUEST_AIRDROP = 'REQUEST_AIRDROP';
export const SET_WALLET = 'SET_WALLET';
export const LOAD_WALLET = 'LOAD_WALLET';
export interface CreateWalletAction {
    type: typeof CREATE_WALLET;
}

export interface SetBalanceAction {
    type: typeof SET_BALANCE;
    balance: number;
}

export interface SendSolAction {
    type: typeof SEND_SOL;
    payload: {
        toPublicKey: string;
        amount: number;
    };
}

export interface RequestAirdropAction {
  type: typeof REQUEST_AIRDROP;
}

export interface LoadWalletAction{
    type: typeof SET_WALLET;
    payload: {
        publicKey: string;
        secretKey: string;
    }
}
export type WalletActionTypes = CreateWalletAction | SetBalanceAction | SendSolAction | RequestAirdropAction | LoadWalletAction;