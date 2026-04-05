interface GameOverProps {
  winner: string | null;
  onRestart: () => void;
}

export default function GameOver({ winner, onRestart }: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <button onClick={onRestart}>Play again</button>
    </div>
  );
}
