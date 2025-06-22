export const debitCardItems = [
  {
    id: "topup",
    title: "Top-up account",
    body: "Deposit money to your account to use with card",
    isTogglePresent: false,
    iconURI : "../../assets/insight.svg",
    inverseTitle: "",
    inverseSubtitle: "",

  },
  {
    id: "weeklySpendLimit",
    title: "Weekly spending limit",
    body: "You haven't set any spending limit on card",
    isTogglePresent: true,
    iconURI : "../../assets/insight.svg",
    inverseTitle: "Weekly spending limit",
    inverseSubtitle: "Your weekly spending limit is S$ ",
  },
  {
    id: "freezeCard",
    title: "Freeze card",
    body: "Your debit card is currently active",
    iconURI : "../../assets/insight.svg",
    isTogglePresent: true,
    inverseTitle: "UnFreeze card",
    inverseSubtitle: "Your debit card is currently in-active",
  },
  {
    id: "getNewCard",
    title: "Get a new card",
    body: "This deactivates your current debit card",
    iconURI : "../../assets/insight.svg",
    isTogglePresent: false,
    inverseTitle: "",
    inverseSubtitle: "",
  },
  {
    id: "deactivatedCard",
    title: "Deactivated cards",
    body: "Your previously deactivated cards",
    iconURI : "../../assets/insight.svg",
    isTogglePresent: false,
    inverseTitle: "",
    inverseSubtitle: "",
  },
];

export const dummyCardData = { 
  name : "No Card Found", 
  cardNum : "*****************", 
  expiryDate: "**/**", 
  cvv: "***", 
  isCardFreezed: true 
}