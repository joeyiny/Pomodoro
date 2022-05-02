import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import RoomScreen from "./screens/RoomScreen";
import JoinRoom from "./components/JoinRoom.tsx";
import { SocketProvider } from "./types/GlobalContext";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":roomCode" element={<RoomScreen />} />
            <Route path="/" element={<JoinRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
