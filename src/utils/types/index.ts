export interface Card {
  id: number;
  name: string;
  cardNum: string;
  expiryDate: string;
  cvv: string;
  isSpendingLimitEnabled: boolean;
  spendingLimit: number;
  isCardFreezed: boolean;
}

export interface cardStateType {
   cardDetails : Card[],
   selectedCardIdx : number
}

export interface storeType  {
    cards : cardStateType
}