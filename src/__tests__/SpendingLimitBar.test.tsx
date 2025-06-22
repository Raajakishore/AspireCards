import React from "react";
import { render } from "@testing-library/react-native";
import { SpendingLimitBar } from "../components/SpendingLimitBar";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.spyOn(Math, "random").mockReturnValue(0.5);

describe("SpendingLimitBar Component test cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("tests the value of spendingLimit and random Value", () => {
    //@ts-ignore
    useSelector.mockReturnValue({
      spendingLimit: 100,
      isSpendingLimitEnabled: true,
    });
    const { getByTestId, getByText } = render(<SpendingLimitBar />);

    expect(getByTestId("header").props.children).toBe(
      "Debit card spending limit",
    );

    expect(getByText("$50")).toBeTruthy();
    expect(getByText("$100")).toBeTruthy();
  });
});
