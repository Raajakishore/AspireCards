import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CreditCardUI } from "../components/CreditCardUI";

jest.mock("../../assets/icons/showCardNumber.svg", () => "ShowEyeSVG");
jest.mock("../../assets/icons/hideCardNumber.svg", () => "HideEyeSVG");
jest.mock("../../assets/icons/visaLogo.svg", () => "VisaSVG");
jest.mock("../../assets/icons/aspireLogo.svg", () => "AspireLogoSVG");
jest.mock("react-native-snap-carousel", () => {
  const React = require("react");
  return class extends React.Component {
    render() {
      return null;
    }
  };
});

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));

const sampleCard = {
  id: 1,
  name: "Raaj",
  cardNum: "1234567890123456",
  expiryDate: "12/25",
  cvv: "789",
  isSpendingLimitEnabled: false,
  spendingLimit: 0,
  isCardFreezed: false,
};

describe("CreditCardUI Component test", () => {
  it("check name, card numbers, expiry and CVV", () => {
    const { getByTestId, getByText } = render(
      <CreditCardUI item={sampleCard} />,
    );

    expect(getByTestId("card-name").props.children).toBe("Raaj");

    expect(getByTestId("expiry-date").props.children).toBe(`Thru: 12/25`);
    expect(getByTestId("cvv").props.children).toBe(`CVV: 789`);
    expect(getByText("Hide Card Number")).toBeTruthy();
  });

  it("toggles the hide card number and checks the card number visibility", () => {
    const { getByText, getAllByText, getByTestId } = render(
      <CreditCardUI item={sampleCard} />,
    );

    fireEvent.press(getByText("Hide Card Number"));

    expect(getAllByText("****").length).toBe(3);
    expect(getAllByText("3456").length).toBe(1);

    expect(getByTestId("cvv").props.children).toBe("CVV: ***");

    expect(getByText("Show Card Number")).toBeTruthy();
  });
});
