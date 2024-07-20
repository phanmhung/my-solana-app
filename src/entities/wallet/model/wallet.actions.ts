import { CREATE_WALLET, REQUEST_AIRDROP, RequestAirdropAction, SEND_SOL, SendSolAction, SET_BALANCE, SET_WALLET } from "./wallet.types";


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

export const requestAirdrop = (): RequestAirdropAction => ({
  type: REQUEST_AIRDROP,
});

export const setWallet = (publicKey: string, secretKey: string) => ({
  type: SET_WALLET,
  payload: { publicKey, secretKey },
});