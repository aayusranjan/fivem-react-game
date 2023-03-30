import React from "react";
// import second from 'first'
import "./GameBox.css";
import Board from "./Board";

const GameBox = () => {
  return (
    <>
      <div id="gamebox">
        <div className="board-wrapper">
          <Board />
        </div>
      </div>
    </>
  );
};

export default GameBox;
