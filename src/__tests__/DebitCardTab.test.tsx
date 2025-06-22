import React from 'react';
import { render } from '@testing-library/react-native';
import { DebitCardTab } from '../screens/Tabbar/DebitCardTab';
import { getCardDetailsAction } from '../store/actions';
import { debitCardItems } from '../utils/helper';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('../components/CreditCardUI', () => ({
  CreditCardCarousel: () => <></>,
}));
jest.mock('../components/SpendingLimitBar', () => ({
  SpendingLimitBar: () => <></>,
}));
jest.mock('../components/CardWithInfo', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    CardWithInfo: ({ item }: any) => (
      <View testID={`card-item-${item.title}`} />
    ),
  };
});

jest.mock('../../assets/icons/homeActiveTabIcon.svg', () => 'AspireLogoSVG');

describe('DebitCardTab test cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test dispatch getCardDetailsAction', () => {
    render(<DebitCardTab />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getCardDetailsAction());
  });

  it('test CardWithInfo render', () => {
    const { getByTestId } = render(<DebitCardTab />);
    debitCardItems.forEach((item) => {
      expect(getByTestId(`card-item-${item.title}`)).toBeTruthy();
    });
  });
});
