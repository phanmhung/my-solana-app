import { CREATE_WALLET, SET_BALANCE } from "./wallet.types";


export const createWallet = () => ({
  type: CREATE_WALLET,
});

export const setBalance = (balance: number) => ({
  type: SET_BALANCE,
  balance,
});