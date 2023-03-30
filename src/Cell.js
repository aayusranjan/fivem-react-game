import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit, id }) {
  // console.log(`Cell ${id} isLit: ${isLit}`);
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return (
    <td data-testid={id} className={classes} onClick={flipCellsAroundMe}></td>
  );
}

export default Cell;
