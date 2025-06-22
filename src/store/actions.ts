import { createAction } from '@reduxjs/toolkit';
import { Card } from '../utils/types';

export const addNewCardAction = createAction<Card>('counter/addNewCardAction');
export const getCardDetailsAction = createAction('counter/getCardDetailsAction');
export const updateCardAction = createAction<updateCardActionType>('counter/updateCardAction');

type updateCardActionType = {
    id : number,
    updates : { isSpendingLimitEnabled?: boolean,
    isCardFreezed?: boolean,
    spendingLimit? : number
    }
}

