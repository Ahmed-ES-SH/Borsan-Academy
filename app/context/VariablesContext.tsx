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
import { useParams, usePathname, useSearchParams } from "next/navigation";

const Variables = createContext<VariablesContextType | undefined>(undefined);

interface VariablesProviderProps {
  children: ReactNode;
}

export default function VariablesProvider({
  children,
}: VariablesProviderProps): JSX.Element {
  const params = useParams();
  const pathName = usePathname();
  const SearchParams = useSearchParams();
  const locale = (params.local as string) || "en";
  const [language, setLanguage] = useState("en");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showUserButton, setShowUserButton] = useState(false);
  const [showNavLinksDrop, setShowNavLinksDrop] = useState(false);
  const [showLangDrop, setShowLangDrop] = useState(false);
  const [showMessagesDrop, setShowMessagesDrop] = useState(false);
  const [showNotificationDrop, setShowNotificationDrop] = useState(false);
  const [showSideCart, setShowSideCart] = useState(false);
  const [showDropWishList, setShowDropWishList] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }
  }, []);

  const toggleCart = () => {
    setShowSideCart((prev) => !prev);
  };

  const toggleDropWishList = () => {
    setShowDropWishList((prev) => !prev);
  };

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
        showSideCart,
        setShowSideCart,
        showLangDrop,
        setShowLangDrop,
        width,
        toggleCart,
        locale,
        pathName,
        SearchParams,
        showDropWishList,
        setShowDropWishList,
        toggleDropWishList,
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
