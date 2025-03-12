"use client";
import { createContext, JSX, ReactNode, useContext, useState } from "react";
import { VariablesContextType } from "../types/_website/ContextTypes";

const Variables = createContext<VariablesContextType | undefined>(undefined);

interface VariablesProviderProps {
  children: ReactNode;
}

export default function VariablesProvider({
  children,
}: VariablesProviderProps): JSX.Element {
  const [language, setLanguage] = useState("en");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showUserButton, setShowUserButton] = useState(false);
  const [showMessagesDrop, setShowMessagesDrop] = useState(false);
  const [showNotificationDrop, setShowNotificationDrop] = useState(false);

  return (
    <Variables.Provider
      value={{
        showMessagesDrop,
        setShowMessagesDrop,
        showNotificationDrop,
        setShowNotificationDrop,
        showUserButton,
        setShowUserButton,
        language,
        setLanguage,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </Variables.Provider>
  );
}

// 5. استهلاك السياق مع التحقق
export const UseVariables = (): VariablesContextType => {
  const context = useContext(Variables);
  if (!context) {
    throw new Error("UseVariables must be used within a VariablesProvider");
  }
  return context;
};
