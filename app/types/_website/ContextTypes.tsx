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
  showSideCart: boolean;
  setShowSideCart: Dispatch<SetStateAction<boolean>>;
  toggleCart: () => void;
  locale: string;
  pathName: any;
  SearchParams: any;
  showDropWishList: boolean;
  setShowDropWishList: Dispatch<SetStateAction<boolean>>;
  toggleDropWishList: () => void;
}

export interface cardType {
  id: number;
  price: number;
  title: string;
  lessons: number;
  students: number;
  rating: number;
  courseLongbydays: number;
  image: string;
  quantity: number;
}

export type CartContextType = {
  cartitems: cardType[];
  quantity: number;
  getitemquanity: (currentitem: cardType) => number;
  decreasequantity: (currentitem: cardType) => void;
  increasequantity: (currentitem: cardType) => void;
  removefromcard: (currentitem: cardType) => void;
  addToCart: (currentitem: cardType) => void;
  open_close: () => void;
  setcartitems: Dispatch<SetStateAction<cardType[]>>;
  isopen: boolean;
  showSuccessAlart: boolean;
  setShowSuccessAlart: Dispatch<SetStateAction<boolean>>;
  setShowErrorAlart: Dispatch<SetStateAction<boolean>>;
  showErrorAlart: boolean;
  wishListItems: cardType[];
  setWishListItems: Dispatch<SetStateAction<cardType[]>>;
  addToWishlist: (currentitem: cardType) => void;
  removefromwishList: (currentitem: cardType) => void;
};
