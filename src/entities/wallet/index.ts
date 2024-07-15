import { walletState } from './model/wallet.store';

export * from './model/wallet.store';
export * from './model/wallet.actions';
export * from './model/wallet.reducers';

export const walletBalance = (state: walletState) => state.balance;