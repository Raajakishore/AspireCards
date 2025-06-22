import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

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

// navigation types

export type HomeTabbarParamList = {
  Home: undefined;
  'Debit Card': undefined;
  Payments: undefined;
  Credit: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  HomeTabbar: NavigatorScreenParams<HomeTabbarParamList>;
  SpendingLimit: undefined;
};