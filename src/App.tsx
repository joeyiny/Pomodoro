import "./App.css";
import Tasks from "./Components/TaskList.tsx";
import Timer from "./Components/Timer.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer />
        <Tasks />
      </header>
    </div>
  );
}

export default App;
