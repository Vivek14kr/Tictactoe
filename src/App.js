import React, { useState } from "react";
import "./App.css";
import { SymbolSelection } from "./components/SymbolSelection";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  const [turn, setTurn] = useState(null);
  const [computer, setComputer] = useState(null);

  const handleSymbolSelection = (selectedSymbol) => {
    setPlayer(selectedSymbol);
    setComputer(selectedSymbol == "X" ? "O" : "X");
    setTurn("player");
  };

  const handlePlayerMove = (index) => {
    if (!player || board[index] || winner || turn !== "player") return; // Check if it's the player's turn
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setTurn("computer");
      handleComputerMove(newBoard);
    }
  };
  const handleComputerMove = async (currentBoard) => {
    const response = await fetch(
      "https://hiring-react-assignment.vercel.app/api/bot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentBoard),
      }
    );

    if (response.ok) {
      const computerMove = await response.json();
      if (currentBoard[computerMove] === null && !winner) {
        currentBoard[computerMove] = computer;
        setBoard(currentBoard);

        const result = calculateWinner(currentBoard);
        if (result) {
          setWinner(result);
        } else {
          setTurn("player");
        }
      }
    }
  };

  const calculateWinner = (currentBoard) => {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombination) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    if (!currentBoard.includes(null)) {
      return "Draw";
    }

    return null;
  };

  const renderSquare = (index) => (
    <div className="square" onClick={() => handlePlayerMove(index)}>
      {board[index]}
    </div>
  );
  const status = winner
    ? winner === "Draw"
      ? "Draw"
      : `Winner: ${winner === player ? "Player" : "Computer"}`
    : `Turn: ${turn === "player" ? "Player" : "Computer"}`;

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setPlayer(null);
    setWinner(null);

    setTurn(null);
    setComputer(null);
  };
  return (
    <div className="App">
      {player ? (
        <div>
          <h1>Tic Tac Toe </h1>
          <div>
            <div className="board">
              <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
              </div>
              <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
              </div>
              <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
              </div>
            </div>
          </div>
          <div className="status">{status}</div>

          {winner && (
            <button
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "greenyellow",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={handleRestart}
            >
              Retry
            </button>
          )}
        </div>
      ) : (
        <SymbolSelection onSymbolSelect={handleSymbolSelection} />
      )}
    </div>
  );
};



export default App;
