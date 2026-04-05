import type { PlayerSymbol } from "./Player";

export type Board = (PlayerSymbol | null)[][];

interface GameBoardProps {
  onSelectSquare: (rowIndex: number, columnIndex: number) => void;
  board: Board;
}

export default function GameBoard({ onSelectSquare, board }: GameBoardProps) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={`game-board-${rowIndex.toString()}`}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={`game-board-${columnIndex.toString()}`}>
                <button
                  type="button"
                  onClick={() => { onSelectSquare(rowIndex, columnIndex); }}
                  disabled={!!playerSymbol}
                  data-symbol={playerSymbol ?? ""}
                >
                  <span className="board-symbol-offset">{playerSymbol}</span>
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
