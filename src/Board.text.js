import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Board from "./Board";

it("renders", () => {
  render(<Board />);
});

it("matches snapshot", () => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.5);

  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();

  jest.spyOn(global.Math, "random").mockRestore();
});

describe("clicking cells flips right ones", () => {
  test("middle cell", () => {
    const { getByTestId } = render(<Board />);
    const cell = getByTestId("1-1");
    const aboveCell = getByTestId("0-1");
    const belowCell = getByTestId("2-1");
    const leftCell = getByTestId("1-0");
    const rightCell = getByTestId("1-2");

    expect(cell).not.toHaveClass("Cell-lit");
    expect(aboveCell).not.toHaveClass("Cell-lit");
    expect(belowCell).toHaveClass("Cell-lit");
    expect(leftCell).not.toHaveClass("Cell-lit");
    expect(rightCell).toHaveClass("Cell-lit");

    fireEvent.click(cell);

    expect(cell).toHaveClass("Cell-lit");
    expect(aboveCell).toHaveClass("Cell-lit");
    expect(belowCell).not.toHaveClass("Cell-lit");
    expect(leftCell).toHaveClass("Cell-lit");
    expect(rightCell).not.toHaveClass("Cell-lit");
  });
});

describe("winning the game", () => {
  test("turning out all lights", () => {
    const { getByTestId, queryByText, debug } = render(<Board />);
    const cell = getByTestId("2-2");

    expect(queryByText(/you won/)).toBeNull();

    fireEvent.click(cell);

    expect(queryByText(/you won/i)).toBeTruthy();
  });
});
