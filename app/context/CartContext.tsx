"use client";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { cardType, CartContextType } from "../types/_website/ContextTypes";

const Cart_context = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [wishListItems, setWishListItems] = useState<cardType[]>([]);
  const [cartitems, setcartitems] = useState<cardType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSuccessAlart, setShowSuccessAlart] = useState(false);
  const [showErrorAlart, setShowErrorAlart] = useState(false);
  //   const [currentUser, setCurrentUser] = useState({});

  // تحميل البيانات من localStorage عند أول تحميل
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartitems");
      const wishlistItems = localStorage.getItem("wishlistitems");
      if (storedCartItems) {
        setcartitems(JSON.parse(storedCartItems));
      }

      if (wishlistItems) {
        setWishListItems(JSON.parse(wishlistItems));
      }
      setIsInitialized(true); // التأكيد أن التهيئة تمت
    }
  }, []);

  // تحديث localStorage فقط بعد اكتمال التهيئة
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
      localStorage.setItem("wishlistitems", JSON.stringify(wishListItems));
    }
  }, [cartitems, wishListItems, isInitialized]);

  const [isopen, setisopen] = useState(false);

  const quantity = cartitems.reduce((total, item) => total + item.quantity, 0);

  const open_close = () => {
    setisopen((prev) => !prev);
  };

  const getitemquanity = (currentitem: cardType) => {
    return cartitems.find((item) => item.id == currentitem.id)?.quantity || 0;
  };

  const removefromcard = (currentitem: cardType): void => {
    setcartitems((items) => items.filter((item) => item.id != currentitem.id));
  };

  const increasequantity = (currentitem: cardType): void => {
    setcartitems((items) => {
      const existingItem = items.find((item) => item.id === currentitem.id);
      if (!existingItem) {
        return [...items, { ...currentitem, quantity: 1 }];
      } else {
        return items.map((item) =>
          item.id === currentitem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  };

  const decreasequantity = (currentitem: cardType): void => {
    setcartitems((items) => {
      const existingItem = items.find((item) => item.id === currentitem.id);
      if (!existingItem) {
        return items;
      }
      if (existingItem.quantity <= 1) {
        return items.filter((item) => item.id !== currentitem.id);
      } else {
        return items.map((item) =>
          item.id === currentitem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const addToCart = (currentitem: cardType) => {
    // أولاً: نحذف العنصر من قائمة الأمنيات إن وجد
    setWishListItems((prev) =>
      prev.filter((item) => item.id !== currentitem.id)
    );

    // ثانياً: نضيفه إلى السلة إن لم يكن موجوداً
    setcartitems((items) => {
      const existingItem = items.find((item) => item.id === currentitem.id);
      if (!existingItem) {
        setShowSuccessAlart(true);
        return [...items, { ...currentitem, quantity: 1 }];
      } else {
        setShowErrorAlart(true);
        return items;
      }
    });
  };

  // wishList Function lines

  const addToWishlist = (currentitem: cardType) => {
    setWishListItems((items) => {
      const existingItem = items.find((item) => item.id === currentitem.id);
      if (!existingItem) {
        setShowSuccessAlart(true);
        return [...items, { ...currentitem, quantity: 1 }];
      } else {
        setShowErrorAlart(true);
        return items;
      }
    });
  };

  const removefromwishList = (currentitem: cardType): void => {
    setWishListItems((items) =>
      items.filter((item) => item.id != currentitem.id)
    );
  };

  return (
    <Cart_context.Provider
      value={{
        cartitems,
        quantity,
        getitemquanity,
        decreasequantity,
        increasequantity,
        removefromcard,
        open_close,
        addToCart,
        setcartitems,
        isopen,
        showSuccessAlart,
        setShowSuccessAlart,
        setShowErrorAlart,
        showErrorAlart,
        wishListItems,
        setWishListItems,
        addToWishlist,
        removefromwishList,
      }}
    >
      {children}
    </Cart_context.Provider>
  );
};

export default CartProvider;

export const Cartcontext = (): CartContextType => {
  const context = useContext(Cart_context);
  if (!context) {
    throw new Error("Cardcontext must be used within a CartProvider");
  }
  return context;
};
