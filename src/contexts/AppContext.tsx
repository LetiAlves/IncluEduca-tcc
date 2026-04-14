import React, { createContext, useContext, useState, useCallback } from "react";

export type ConditionType = "tea" | "tdah" | null;
export type SupportLevel = 1 | 2 | 3 | null;

interface AppState {
  condition: ConditionType;
  supportLevel: SupportLevel;
  fontSize: number;
  focusMode: boolean;
  darkMode: boolean;
  setCondition: (c: ConditionType) => void;
  setSupportLevel: (l: SupportLevel) => void;
  setFontSize: (s: number) => void;
  toggleFocusMode: () => void;
  toggleDarkMode: () => void;
  reset: () => void;
}

const AppContext = createContext<AppState | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [condition, setCondition] = useState<ConditionType>(null);
  const [supportLevel, setSupportLevel] = useState<SupportLevel>(null);
  const [fontSize, setFontSize] = useState(16);
  const [focusMode, setFocusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleFocusMode = useCallback(() => setFocusMode((p) => !p), []);
  const toggleDarkMode = useCallback(() => {
    setDarkMode((p) => {
      const next = !p;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCondition(null);
    setSupportLevel(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        condition, supportLevel, fontSize, focusMode, darkMode,
        setCondition, setSupportLevel, setFontSize, toggleFocusMode, toggleDarkMode, reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
