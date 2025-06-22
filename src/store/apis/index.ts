// mockCardApi.js

// In‐memory store
let cards = [
  { id: 1, name: 'Mark Henry',   cardNum: '4567893214560976', expiryDate: '12/25', cvv: '234', isSpendingLimitEnabled: false, spendingLimit: 0, isCardFreezed: false },
  { id: 2, name: 'Raaja Kishore', cardNum: '5673459076348902', expiryDate: '11/27', cvv: '876', isSpendingLimitEnabled: false, spendingLimit: 0, isCardFreezed: false },
  { id: 3, name: 'Mark Henry',   cardNum: '6748928347018594', expiryDate: '09/31', cvv: '432', isSpendingLimitEnabled: false, spendingLimit: 0, isCardFreezed: false },
];

/**
 * GET /cards → returns all cards after 1s
 * @returns {Promise<Array>}
 */
export function getAllCardDetails() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // return a copy so callers can’t accidentally mutate our store
      resolve(cards.map(c => ({ ...c })));
    }, 1000);
  });
}

/**
 * POST /cards → adds a new card (id=Date.now()), returns it after 300ms
 * @param {{ name:string, cardNum:string, expiryDate:string, cvv:string,
 *           isSpendingLimitEnabled?:boolean, spendingLimit?:number, isCardFreezed?:boolean }}
 * @returns {Promise<Object>}
 */
export function addNewCard(card) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCard = {
        id: Date.now(),
        // allow passing only a subset; fill defaults
        isSpendingLimitEnabled: false,
        spendingLimit: 0,
        isCardFreezed: false,
        ...card,
      };
      cards.push(newCard);
      resolve({ ...newCard });
    }, 300);
  });
}

/**
 * PUT /cards/:id → updates fields on an existing card, returns updated card after 300ms
 * @param {number} id
 * @param {{ isSpendingLimitEnabled?:boolean, spendingLimit?:number, isCardFreezed?:boolean }} updates
 * @returns {Promise<Object>}
 */
export function updateCard(id, updates) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = cards.findIndex(c => c.id === id);
      if (idx === -1) {
        return reject(new Error(`Card with id=${id} not found`));
      }
      // Only apply the three allowed fields if provided
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
