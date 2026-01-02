import reactLogo from "../assets/icons/react.svg";

export default function Header() {
  return (
    <header className="app-header">
      <img src={reactLogo} alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}
