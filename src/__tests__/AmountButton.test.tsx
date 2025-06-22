import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AmountButton } from '../components/AmountButton';

describe('AmountButton Component Test', () => {
  it('renders the amount correctly and calls setAmount when pressed', () => {
    const mockSetAmount = jest.fn();
    const amount = 250;

    const { getByTestId } = render(
      <AmountButton amount={amount} setAmount={mockSetAmount} />
    );

    expect(getByTestId('amount-text').props.children).toBe(`S$ ${amount}`);

    fireEvent.press(getByTestId('amount-button'));

    expect(mockSetAmount).toHaveBeenCalledTimes(1);
    expect(mockSetAmount).toHaveBeenCalledWith(amount);
  });
});
