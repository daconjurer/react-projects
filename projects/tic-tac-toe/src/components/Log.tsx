import type { PlayerSymbol } from "./Player";

interface Square {
  row: number;
  column: number;
}

export interface Turn {
  square: Square;
  player: PlayerSymbol;
}

export type Turns = Turn[];

interface LogProps {
  turns: Turns;
}

export default function Log({ turns }: LogProps) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row.toString()}-${turn.square.column.toString()}`}>
          {turn.player} selected {turn.square.row}, {turn.square.column}
        </li>
      ))}
    </ol>
  );
}
