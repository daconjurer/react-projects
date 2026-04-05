interface ScoreProps {
  score: number[];
}

export default function ScoreBoard({ score }: ScoreProps) {
  return (
    <div id="score-board">
      <h3>Score</h3>
      <ol>
        {score.map((score, scoreIndex) => (
          <li key={`score-player${(scoreIndex + 1).toString()}`}>{score}</li>
        ))}
      </ol>
    </div>
  );
}
