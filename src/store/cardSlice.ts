
// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
            cardDetails: [  ],
            selectedCardIdx : 1
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    storeNewCard(state, action: PayloadAction<number>) {
        state.cardDetails.push(action.payload);
    },
    setAllCardDetails(state, action: PayloadAction<number>) {
        state.cardDetails = action.payload;
    },
    setSelectedCardIdx(state, action: PayloadAction<number>) {
        state.selectedCardIdx = action.payload.selectedCardIdx;
    },
       updateCardSettings(
      state,
      action: PayloadAction<{
        id: number;
        isSpendingLimitEnabled?: boolean;
        spendingLimit?: number;
        isCardFreezed?: boolean;
      }>
    ) {
      const { id, isSpendingLimitEnabled, spendingLimit, isCardFreezed } = action.payload;
      const card = state.cardDetails.find((c) => c.id === id);
      if (card) {
        if ( typeof isSpendingLimitEnabled === "boolean") {
          card.isSpendingLimitEnabled = isSpendingLimitEnabled;
        }
        if ( typeof spendingLimit === "number") {
          card.spendingLimit = spendingLimit;
        }
        if (typeof isCardFreezed === "boolean") {
          card.isCardFreezed = isCardFreezed;
        }
      }
    },
    }
});

// Export actions & reducer
export const { storeNewCard, setSelectedCardIdx, updateCardSettings , setAllCardDetails} = cardSlice.actions;
export default cardSlice.reducer;