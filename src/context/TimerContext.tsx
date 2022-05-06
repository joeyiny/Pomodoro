import { createContext, useState } from "react";
import { SessionType } from "../types/Session";

export type TimerContextType = {
  seconds: number;
  timerOn: boolean;
  sessionType: SessionType;
  roomCode?: string;
  setSessionType?: any;
  setTimerOn?: any;
  setSeconds?: any;
};

export const TimerContext = createContext<TimerContextType>({
  seconds: 1500,
  timerOn: false,
  sessionType: SessionType.POMODORO,
  setSessionType: () => {},
  setSeconds: () => {},
  setTimerOn: () => {},
});

export const TimerProvider = ({ children }: { children: any }) => {
  const [seconds, setSeconds] = useState<number>(1500);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.POMODORO
  );
  const [timerOn, setTimerOn] = useState<boolean>(false);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        timerOn,
        sessionType,
        setSeconds,
        setTimerOn,
        setSessionType,
      }}>
      {children}
    </TimerContext.Provider>
  );
};
