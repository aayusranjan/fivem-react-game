import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

it("renders", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Cell />
        </tr>
      </tbody>
    </table>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <table>
      <tbody>
        <tr>
          <Cell />
        </tr>
      </tbody>
    </table>
  );
  expect(asFragment()).toMatchSnapshot();
});
