import { Dispatch, SetStateAction } from "react";

// Variables Provider

export interface VariablesContextType {
  language: string;
  width: number;
  setLanguage: Dispatch<SetStateAction<string>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  showUserButton: boolean;
  setShowUserButton: Dispatch<SetStateAction<boolean>>;
  showMessagesDrop: boolean;
  showNotificationDrop: boolean;
  setShowMessagesDrop: Dispatch<SetStateAction<boolean>>;
  setShowNotificationDrop: Dispatch<SetStateAction<boolean>>;
  showNavLinksDrop: boolean;
  setShowNavLinksDrop: Dispatch<SetStateAction<boolean>>;
  showLangDrop: boolean;
  setShowLangDrop: Dispatch<SetStateAction<boolean>>;
}
