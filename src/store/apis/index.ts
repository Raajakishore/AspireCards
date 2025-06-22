import { Card } from "../../utils/types";

// Hard-coded data.
const cards = [
  { id: 1, name: 'Mark Henry',   cardNum: '4567893214560976', expiryDate: '12/25', cvv: '234', isSpendingLimitEnabled: false, spendingLimit: 0, isCardFreezed: false },
  { id: 2, name: 'Raaja Kishore', cardNum: '5673459076348902', expiryDate: '11/27', cvv: '876', isSpendingLimitEnabled: false, spendingLimit: 0, isCardFreezed: false },
  { id: 3, name: 'Keshav Prasath',   cardNum: '6748928347018594', expiryDate: '09/31', cvv: '432', isSpendingLimitEnabled: false, spendingLimit: 0, isCardFreezed: false },
];

/**
 * GET /cards → returns all cards after 500s
 */
export function getAllCardDetails() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cards.map(c => ({ ...c })));
    }, 500);
  });
}

/**
 * POST /cards → adds a new card (id=Date.now()), returns it after 300ms
 */
export function addNewCard(card : Card) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCard = {
        ...card,
        id: Date.now(),
        isSpendingLimitEnabled: false,
        spendingLimit: 0,
        isCardFreezed: false,
      };
      cards.push(newCard);
      resolve({ ...newCard });
    }, 300);
  });
}

/**
 * PUT /cards/:id → updates fields on an existing card, returns updated card after 300ms
 */
export function updateCard(id : number, updates : Partial<Pick<Card, 'isSpendingLimitEnabled' | 'spendingLimit' | 'isCardFreezed'>>) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = cards.findIndex(c => c.id === id);
      if (idx === -1) {
        return reject(new Error(`Card with id=${id} not found`));
      }
      const card = cards[idx];
      if (typeof updates.isSpendingLimitEnabled === 'boolean') {
        card.isSpendingLimitEnabled = updates.isSpendingLimitEnabled;
      }
      if (typeof updates.spendingLimit === 'number') {
        card.spendingLimit = updates.spendingLimit;
      }
      if (typeof updates.isCardFreezed === 'boolean') {
        card.isCardFreezed = updates.isCardFreezed;
      }
      resolve({ ...card });
    }, 300);
  });
}
