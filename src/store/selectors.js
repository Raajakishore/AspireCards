import { createSelector } from '@reduxjs/toolkit';

export const selectCardDetails     = state => state.cards.cardDetails;
export const selectSelectedCardIdx = state => state.cards.selectedCardIdx;

export const selectCurrentCard = createSelector(
  [selectCardDetails, selectSelectedCardIdx],
  (cardDetails, selectedIdx) => {
    return cardDetails?.find(c => c.id === selectedIdx) ?? null
  }
);
