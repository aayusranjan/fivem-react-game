import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5 }) {
  const [board, setBoard] = useState(createBoard());

  // useEffect(() => {
  //   setBoard(setBoard());
  // })

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const newRow = [];
      for (let j = 0; j < ncols; j++) {
        newRow.push(false);
      }
      initialBoard.push(newRow);
    }
    const ranNum = (max) => Math.floor(Math.random() * max);
    const flipSpots = (x, y) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        initialBoard[y][x] = !initialBoard[y][x];
      }
    };
    const numClicks = (ncols + nrows) % 2 ? ncols + nrows : ncols + nrows - 1;
    for (let i = 0; i < numClicks; i++) {
      const x = ranNum(ncols);
      const y = ranNum(nrows);
      flipSpots(x, y);
      flipSpots(x + 1, y);
      flipSpots(x - 1, y);
      flipSpots(x, y + 1);
      flipSpots(x, y - 1);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    console.log(`Clicked cell at ${coord}`);
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = JSON.parse(JSON.stringify(oldBoard));

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // const boardCopy = [...oldBoard];
      // other method instead of spreading operator

      flipCell(y, x, boardCopy);
      // flip cells around as well
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      // console.log(boardCopy); check wheather the boardcopy is working or not.
      return boardCopy;
    });
  }

  const tableEle = (
    <table className="Board-table">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((column, x) => (
              <Cell
                id={`${y}-${x}`}
                key={`${y}-${x}`}
                isLit={column}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="Board">
      {hasWon() ? <h2 className="Board-title">Access Granted!</h2> : tableEle}
    </div>
  );
}

export default Board;
