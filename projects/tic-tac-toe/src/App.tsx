import { useState } from "react";

import type { Board } from "./components/GameBoard";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Header from "./components/Header";
import type { Turns } from "./components/Log";
import Log from "./components/Log";
import type { PlayerSymbol } from "./components/Player";
import Player from "./components/Player";
import ScoreBoard from "./components/ScoreBoard";
import { WINNING_COMBINATIONS } from "./winning-combinations";

interface Players {
  X: string;
  O: string;
}

const INITIAL_PLAYERS: Players = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_SCORE = [0, 0];

function deriveWinner(
  number_of_turns: number,
  board: Board,
  players: Players,
): string | null {
  if (number_of_turns < 4) {
    return null;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].column];
    const secondSquareSymbol = board[combination[1].row][combination[1].column];
    const thirdSquareSymbol = board[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      return players[firstSquareSymbol];
    }
  }
  return null;
}

function deriveBoard(turns: Turns): Board {
  return turns.reduce(
    (acc, { square: { row, column }, player }) =>
      acc.map((mappedRow, mappedRowIndex) =>
        mappedRowIndex === row
          ? mappedRow.map((cell, cellIndex) =>
              cellIndex === column ? player : cell,
            )
          : mappedRow,
      ),
    INITIAL_GAME_BOARD.map((row) => [...row]),
  );
}

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState<Turns>([]);
  const [score, setScore] = useState(INITIAL_SCORE);

  const board = deriveBoard(gameTurns);
  const winner = deriveWinner(gameTurns.length, board, players);
  const draw = !winner && gameTurns.length === 9;

  function handleRestart() {
    setScore((previous) =>
      winner
        ? previous.map((score, index) =>
            winner === (index === 0 ? players.X : players.O)
              ? score + 1
              : score,
          )
        : previous,
    );
    setGameTurns([]);
  }

  function isPlayerActive(player: PlayerSymbol): boolean {
    return deriveActivePlayer(gameTurns) === player;
  }

  function deriveActivePlayer(turns: Turns): PlayerSymbol {
    return turns.length > 0 && turns[0].player === "X" ? "O" : "X";
  }

  function handlePlayerNameChange(symbol: PlayerSymbol, newName: string) {
    setPlayers((previous) => {
      return {
        ...previous,
        [symbol]: newName,
      };
    });
  }

  function handleSelectSquare(rowIndex: number, columnIndex: number) {
    setGameTurns((previous) => [
      {
        square: { row: rowIndex, column: columnIndex },
        player: deriveActivePlayer(previous),
      },
      ...previous,
    ]);
  }

  return (
    <>
      <Header logo="/game-logo-dark.png" />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              symbol="X"
              isActive={isPlayerActive("X")}
              onNameChange={handlePlayerNameChange}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={isPlayerActive("O")}
              onNameChange={handlePlayerNameChange}
            />
          </ol>
          <ScoreBoard score={score} />
          <GameBoard onSelectSquare={handleSelectSquare} board={board} />
          {(!!winner || draw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
