import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import  AddNewCardModal  from '../components/AddNewCardModal';

  const mockDispatch = jest.fn();

  jest.mock('react-redux', ()=> ({
        useDispatch : () => mockDispatch
  }));

describe('AmountButton Component Test', () => {
  const onClose = jest.fn();

  beforeEach(()=>{
    jest.clearAllMocks();
  })

  it('Cancel button calls onClose without dispatch', () => {
    const { getByTestId } = render(
      <AddNewCardModal visible={true} onClose={onClose} />
    );
    fireEvent.press(getByTestId('cancel-button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Save button is disabled until valid input', () => {
    const { getByTestId } = render(
      <AddNewCardModal visible={true} onClose={onClose} />
    );
    const saveButton = getByTestId('save-button');
    expect(saveButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(getByTestId('card-holder-name'), 'Raaj');
    fireEvent.changeText(getByTestId('card-holder-number'), '1234');
    expect(saveButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(
      getByTestId('card-holder-number'),
      '1111222233334444'
    );
    expect(saveButton.props.accessibilityState.disabled).toBe(false);
  });

it('Save button dispatch', async () => {
    const { getByTestId } = render(
      <AddNewCardModal visible={true} onClose={onClose} />
    );

    fireEvent.changeText(getByTestId('card-holder-name'), 'Raaj');
    fireEvent.changeText(
      getByTestId('card-holder-number'),
      '5555666677778888'
    );
    const saveButton = getByTestId('save-button');

    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

});
