import { useState } from "react";

export type PlayerSymbol = "X" | "O";

interface PlayerProps {
  initialName: string;
  symbol: PlayerSymbol;
  isActive: boolean;
  onNameChange: (symbol: PlayerSymbol, newName: string) => void;
}

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  const editLabel = isEditing ? "Save" : "Edit";
  const playerContent = isEditing ? (
    <input
      type="text"
      required
      maxLength={15}
      value={playerName}
      onChange={handleChange}
    ></input>
  ) : (
    <span className="player-name">{playerName}</span>
  );
  const liClassName = isActive ? "active" : "";

  return (
    <li className={liClassName}>
      <span className="player">
        <span className="player-symbol">{symbol}</span>
        {playerContent}
      </span>
      <button className="player" onClick={handleEdit}>
        {editLabel}
      </button>
    </li>
  );
}
