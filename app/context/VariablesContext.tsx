"use client";
import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [showNavLinksDrop, setShowNavLinksDrop] = useState(false);
  const [showLangDrop, setShowLangDrop] = useState(false);
  const [showMessagesDrop, setShowMessagesDrop] = useState(false);
  const [showNotificationDrop, setShowNotificationDrop] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }
  }, []);

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
        showNavLinksDrop,
        setShowNavLinksDrop,
        showSidebar,
        setShowSidebar,
        showLangDrop,
        setShowLangDrop,
        width,
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
