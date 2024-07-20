import { CREATE_WALLET, SEND_SOL, SendSolAction, SET_BALANCE } from "./wallet.types";


export const createWallet = () => ({
  type: CREATE_WALLET,
});

export const setBalance = (balance: number) => ({
  type: SET_BALANCE,
  balance,
});

export const sendSol = (toPublicKey: string, amount: number): SendSolAction => ({
  type: SEND_SOL,
  payload: { toPublicKey, amount },
});