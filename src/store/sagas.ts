import { call, put, all, takeEvery } from "redux-saga/effects";
import { getAllCardDetails, addNewCard, updateCard } from "./apis/index";
import {
  storeNewCard,
  setAllCardDetails,
  updateCardSettings,
} from "./cardSlice";
import {
  getCardDetailsAction,
  addNewCardAction,
  updateCardAction,
} from "./actions";
import { SagaIterator } from "redux-saga";

// Fetch all cards
function* getCardDetailsSaga(): SagaIterator {
  try {
    const cards = yield call(getAllCardDetails);

    yield put(setAllCardDetails(cards));
  } catch (err) {
    console.error("Error fetching cards:", err);
  }
}

// Add a new card
function* addNewCardSaga(
  action: ReturnType<typeof addNewCardAction>,
): SagaIterator {
  try {
    const newCard = yield call(addNewCard, action.payload);

    yield put(storeNewCard(newCard));
  } catch (err) {
    console.error("Error adding card:", err);
  }
}

// Update an existing card’s settings
function* updateCardDetailsSaga(
  action: ReturnType<typeof updateCardAction>,
): SagaIterator {
  try {
    const { id, updates } = action.payload;
    const updatedCard = yield call(updateCard, id, updates);
    yield put(updateCardSettings(updatedCard));
  } catch (err) {
    console.error("Error updating card:", err);
  }
}

// Watchers
function* watchCard() {
  yield all([
    takeEvery(getCardDetailsAction.type, getCardDetailsSaga),
    takeEvery(addNewCardAction.type, addNewCardSaga),
    takeEvery(updateCardAction.type, updateCardDetailsSaga),
  ]);
}

// root saga
export default function* rootSaga() {
  yield all([watchCard()]);
}
