export const CREATE_WALLET = 'CREATE_WALLET';
export const SET_BALANCE = 'SET_BALANCE';
export const SEND_SOL = 'SEND_SOL';
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
export type WalletActionTypes = CreateWalletAction | SetBalanceAction | SendSolAction;