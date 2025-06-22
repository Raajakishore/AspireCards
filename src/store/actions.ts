import { createAction } from '@reduxjs/toolkit';

// no reducer logic here—just the action types
export const addNewCardAction = createAction('counter/addNewCardAction');
export const getCardDetailsAction = createAction<number>('counter/getCardDetailsAction');
export const updateCardAction = createAction<number>('counter/updateCardAction');
