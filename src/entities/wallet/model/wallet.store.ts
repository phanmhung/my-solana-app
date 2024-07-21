import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import walletReducer from './wallet.reducers';
import { configureStore } from '@reduxjs/toolkit';
import walletSaga from './wallet.sagas';

const walletStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: walletReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });
    sagaMiddleware.run(walletSaga);
    return store;
};
export type walletStoreType = ReturnType<typeof walletStore>;
export type walletDispatchType = walletStoreType['dispatch'];
export type walletState = ReturnType<walletStoreType['getState']>;

export const walletWrapper = createWrapper(walletStore);
