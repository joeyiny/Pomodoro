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
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth } from "./components/utils/RequireAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <TimerProvider>
      <RoomProvider>
        <TasksProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path=":roomCode"
                  element={
                    <RequireAuth>
                      <RoomScreen />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <JoinRoom />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </TasksProvider>
      </RoomProvider>
    </TimerProvider>
  </AuthProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
