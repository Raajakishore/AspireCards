import { Card } from "./types";

export const debitCardItems : DebitCardItemInfo[] = [
  {
    title: "Top-up account",
    body: "Deposit money to your account to use with card",
    isTogglePresent: false,
    toggleOnTitle: "",
    toggleOnBody: "",

  },
  {
    title: "Weekly spending limit",
    body: "You haven't set any spending limit on card",
    isTogglePresent: true,
    toggleOnTitle: "Weekly spending limit",
    toggleOnBody: "Your weekly spending limit is S$ ",
  },
  {
    title: "Freeze card",
    body: "Your debit card is currently active",
    isTogglePresent: true,
    toggleOnTitle: "UnFreeze card",
    toggleOnBody: "Your debit card is currently in-active",
  },
  {
    title: "Get a new card",
    body: "This deactivates your current debit card",
    isTogglePresent: false,
    toggleOnTitle: "",
    toggleOnBody: "",
  },
  {
    title: "Deactivated cards",
    body: "Your previously deactivated cards",
    isTogglePresent: false,
    toggleOnTitle: "",
    toggleOnBody: "",
  },
];

export interface DebitCardItemInfo {
  title: string;
  body: string;
  isTogglePresent: boolean;
  toggleOnTitle: string;
  toggleOnBody: string;
}

export const dummyCardData : Card = { 
  id : 0,
  name : "No Card Found", 
  cardNum : "*****************", 
  expiryDate: "**/**", 
  cvv: "***", 
  isCardFreezed: true ,
  isSpendingLimitEnabled: false,
  spendingLimit: 0
}