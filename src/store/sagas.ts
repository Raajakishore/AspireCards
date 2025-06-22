// src/store/sagas.ts
import { takeEvery, put, delay, all } from 'redux-saga/effects';
import {
    storeNewCard
} from './cardSlice';
import { addNewCardAction, getCardDetailsAction } from './actions';

// worker saga: performs the async increment
function* addNewCardSaga(action) {
  yield delay(1000);            // e.g. fake API call
  console.log("action.payload", action.payload);
  yield put(storeNewCard(action.payload))

}

// worker saga: performs the async add
function* getCardDetailsSaga( ) {
  yield delay(1000);

}

// watcher saga: spawn a new task on each `incrementAsync`
function* watchCard() {
  yield takeEvery(addNewCardAction.type, addNewCardSaga);
  yield takeEvery(getCardDetailsAction.type, getCardDetailsSaga);
}

// root saga
export default function* rootSaga() {
  yield all([
    watchCard()
  ]);
}
