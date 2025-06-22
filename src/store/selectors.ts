import { createSelector } from '@reduxjs/toolkit';
import { storeType } from '../utils/types';

export const selectCardDetails     = (state : storeType) => state.cards.cardDetails;
export const selectSelectedCardIdx = (state : storeType) => state.cards.selectedCardIdx;

export const selectCurrentCard = createSelector(
  [selectCardDetails, selectSelectedCardIdx],
  (cardDetails, selectedIdx) => {
    return cardDetails?.find(c => c.id === selectedIdx) ?? null
  }
);
