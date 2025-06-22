import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  getAllCardDetails,
  addNewCard,
  updateCard,
} from './apis/index';
import {
  storeNewCard,
  setAllCardDetails,
  updateCardSettings,
} from './cardSlice';
import {
    getCardDetailsAction,
    addNewCardAction,
    updateCardAction
} from './actions'; // your trigger-only actions

// 1️⃣ Fetch all cards
function* getCardDetailsSaga() {
  try {
    // calls mockApi.getAllCardDetails() which waits 1s
    const cards = yield call(getAllCardDetails);

    // dispatch to store them in Redux
    yield put(setAllCardDetails(cards));
  } catch (err) {
    console.error('Error fetching cards:', err);
  }
}

// 2️⃣ Add a new card
function* addNewCardSaga(action: ReturnType<typeof addNewCardAction>) {
  try {
    // action.payload is your card object
    const newCard = yield call(addNewCard, action.payload);
    // mockApi.addNewCard waits 300ms and returns { ...card, id }
    yield put(storeNewCard(newCard));
  } catch (err) {
    console.error('Error adding card:', err);
  }
}

// 3️⃣ Update an existing card’s settings
function* updateCardDetailsSaga(action: ReturnType<typeof updateCardAction>) {
  try {
    const { id, updates } = action.payload;
    // calls mockApi.updateCard(id, updates) which waits 300ms
    const updatedCard = yield call(updateCard, id, updates);
    // dispatch the same settings you passed back into Redux
    yield put(updateCardSettings(updatedCard));
  } catch (err) {
    console.error('Error updating card:', err);
  }
}

// 4️⃣ Watchers
function* watchCard() {
  yield all([
    takeEvery(getCardDetailsAction.type, getCardDetailsSaga),
    takeEvery(addNewCardAction.type,      addNewCardSaga),
    takeEvery(updateCardAction.type,      updateCardDetailsSaga),
  ]);
}

// root saga
export default function* rootSaga() {
  yield all([
    watchCard()
  ]);
}

// get - getAllCardDetails
// post - add New Card
// put - update card - freeze card, weekly spending limit
