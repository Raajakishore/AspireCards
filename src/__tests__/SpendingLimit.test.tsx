import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SpendingLimit } from "../screens/SpendingLimit";
import { updateCardAction } from "../store/actions";
import { useSelector } from "react-redux";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.mock("@expo/vector-icons", () => ({ Ionicons: "Ionicons" }));
jest.mock("../../assets/icons/homeActiveTabIcon.svg", () => "AspireLogo");
jest.mock("../../assets/icons/indicator.svg", () => "IndicatorSVG");

describe("<SpendingLimit />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("disables Save when there is no amount selected", () => {
    // @ts-ignore
    useSelector.mockReturnValue(undefined);

    const { getByTestId } = render(<SpendingLimit />);
    const save = getByTestId("save-button");

    expect(save.props.accessibilityState.disabled).toBe(true);
  });

  it("renders current limit and enables Save when card exists", () => {
    // @ts-ignore
    useSelector.mockReturnValue({
      id: 1,
      spendingLimit: 5000,
      isSpendingLimitEnabled: false,
      isCardFreezed: false,
    });

    const { getByText, getByTestId } = render(<SpendingLimit />);
    expect(getByText("5000")).toBeTruthy();

    const save = getByTestId("save-button");

    expect(save.props.accessibilityState.disabled).toBe(false);
  });

  it("updates displayed limit when an AmountButton is pressed", () => {
    //@ts-ignore
    useSelector.mockReturnValue({
      id: 1,
      spendingLimit: 0,
      isSpendingLimitEnabled: false,
      isCardFreezed: false,
    });

    const { getByText, getByTestId } = render(<SpendingLimit />);

    fireEvent.press(getByText("S$ 5000").parent);
    const save = getByTestId("save-button");
    expect(save.props.accessibilityState.disabled).toBe(false);
  });

  it("dispatches updateCardAction and navigates back when Save is pressed", () => {
    //@ts-ignore
    useSelector.mockReturnValue({
      id: 2,
      spendingLimit: 1000,
      isSpendingLimitEnabled: false,
      isCardFreezed: false,
    });

    const { getByTestId } = render(<SpendingLimit />);
    const save = getByTestId("save-button");
    fireEvent.press(save);

    expect(mockDispatch).toHaveBeenCalledWith(
      updateCardAction({
        id: 2,
        updates: {
          spendingLimit: 1000,
          isSpendingLimitEnabled: true,
        },
      }),
    );
    expect(mockGoBack).toHaveBeenCalled();
  });
});
