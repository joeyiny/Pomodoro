import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import RoomScreen from "./screens/RoomScreen";
import JoinRoom from "./components/JoinRoom.tsx";
import { RoomProvider } from "./context/RoomContext";
import { TasksProvider } from "./context/TasksContext";
import { TimerProvider } from "./context/TimerContext";
import Register from "./screens/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <TimerProvider>
    <RoomProvider>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/register" element={<Register />} />
              <Route path=":roomCode" element={<RoomScreen />} />
              <Route path="/" element={<JoinRoom />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </RoomProvider>
  </TimerProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
