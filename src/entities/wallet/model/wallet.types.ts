export const CREATE_WALLET = 'CREATE_WALLET';
export const SET_BALANCE = 'SET_BALANCE';
export interface CreateWalletAction {
    type: typeof CREATE_WALLET;
}

export interface SetBalanceAction {
    type: typeof SET_BALANCE;
    balance: number;
}
export type WalletActionTypes = CreateWalletAction | SetBalanceAction;