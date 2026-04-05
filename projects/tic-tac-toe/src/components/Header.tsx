interface HeaderProps {
  logo: string;
}

export default function Header({ logo }: HeaderProps) {
  return (
    <header className="app-header">
      <img src={logo} alt="Hand drawn tic-tac-toe" />
      <h1>Tic tac toe</h1>
    </header>
  );
}
