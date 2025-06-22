
// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
            cardDetails: [ { "id": 1, name: "Mark Henry", cardNum: "1234567890123456", expiryDate: "12/25", cvv: "234", isSpendingLimitEnabled : false, spendingLimit: 0, isCardFreezed: false},
            { "id": 2, name: "Mark Henry", cardNum: "1234567890123456", expiryDate: "12/25", cvv: "234", isSpendingLimitEnabled : false, spendingLimit: 0, isCardFreezed: false},
            { "id": 3, name: "Mark Henry", cardNum: "1234567890123456", expiryDate: "12/25", cvv: "234", isSpendingLimitEnabled : false, spendingLimit: 0, isCardFreezed: false} ],
            selectedCardIdx : 1
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    storeNewCard(state, action: PayloadAction<number>) {
          console.log("action.payload 2", action.payload);
        state.cardDetails.push(action.payload);
    },
    setSelectedCardIdx(state, action: PayloadAction<number>) {
        console.log("check 2",action.payload.selectedCardIdx );
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
      console.log("action", action.payload)
      const card = state.cardDetails.find((c) => c.id === id);
      if (card) {
        if ( typeof isSpendingLimitEnabled === "boolean") {
            console.log("incoming");
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
export const { storeNewCard, setSelectedCardIdx, updateCardSettings } = cardSlice.actions;
export default cardSlice.reducer;