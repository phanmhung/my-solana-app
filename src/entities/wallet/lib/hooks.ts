import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { walletDispatchType, walletState, walletStoreType } from "../model/wallet.store";

export const useWalletDispatch : () => walletDispatchType = useDispatch;
export const useWalletSelector : TypedUseSelectorHook<walletState> = useSelector;
export const useWalletStore : () => walletStoreType = useStore;