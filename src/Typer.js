import React, { useState, useEffect, useRef } from "react";
import GameBox from "./GameBox";
import "./Typer.css";

const CHARS_PER_STROKES = 3;

const HackerTypeClone = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [content, setContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedRuns, setCompletedRuns] = useState(0);
  const [showWhiteScreen, setShowWhiteScreen] = useState(false);

  const containerRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
    fetch("code.txt")
      .then((res) => res.text())
      .then((text) => setSourceCode(text));
  }, []);

  //   const runScript = () => {
  //     setCurrentIndex(currentIndex + CHARS_PER_STROKES);
  //     setContent(sourceCode.substring(0, currentIndex));
  //     paragraphRef.current.scrollIntoView();
  //   };
  const runScript = () => {
    setCurrentIndex(currentIndex + CHARS_PER_STROKES);
    setContent(sourceCode.substring(0, currentIndex));
    if (completedRuns >= 100) {
      setShowWhiteScreen(true);
    } else {
      setCompletedRuns(completedRuns + 1);
    }
    paragraphRef.current.scrollIntoView();
  };

  const removeMessage = () => {
    console.log("remove message");
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Escape") runScript();
    else removeMessage();
  };

  return (
    <>
      <div className="box">
        {/* <div
          id="container"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={containerRef}
        >
          <div id="source">{content}</div>
          <p ref={paragraphRef}></p>
        </div>
        {showWhiteScreen && <GameBox />} */}
        {/* show either the GameBox or the container based on shouldShowGameBox */}
        {showWhiteScreen ? (
          <GameBox />
        ) : (
          <div id="container" onKeyDown={handleKeyDown} tabIndex={0}>
            <div id="source">{content}</div>
            <p ref={paragraphRef}></p>
          </div>
        )}
      </div>
    </>
  );
};

export default HackerTypeClone;
