import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, cardStateType } from "../utils/types";

const initialState: cardStateType = {
  cardDetails: [],
  selectedCardIdx: 1,
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    storeNewCard(state, action: PayloadAction<Card>) {
      state.cardDetails.push(action.payload);
    },
    setAllCardDetails(state, action: PayloadAction<Card[]>) {
      state.cardDetails = action.payload;
    },
    setSelectedCardIdx(
      state,
      action: PayloadAction<{ selectedCardIdx: number }>,
    ) {
      state.selectedCardIdx = action.payload.selectedCardIdx;
    },
    updateCardSettings(state, action: PayloadAction<Card>) {
      const { id, isSpendingLimitEnabled, spendingLimit, isCardFreezed } =
        action.payload;
      const card = state.cardDetails.find((c) => c.id === id);
      if (card) {
        if (typeof isSpendingLimitEnabled === "boolean") {
          card.isSpendingLimitEnabled = isSpendingLimitEnabled;
        }
        if (typeof spendingLimit === "number") {
          card.spendingLimit = spendingLimit;
        }
        if (typeof isCardFreezed === "boolean") {
          card.isCardFreezed = isCardFreezed;
        }
      }
    },
  },
});

export const {
  storeNewCard,
  setSelectedCardIdx,
  updateCardSettings,
  setAllCardDetails,
} = cardSlice.actions;
export default cardSlice.reducer;
