import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cardSlice';
import rootSaga from './sagas';

const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
