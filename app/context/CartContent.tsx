"use client";

import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface cardType {
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

type CartContextType = {
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
};

const Cart_context = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartitems, setcartitems] = useState<cardType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSuccessAlart, setShowSuccessAlart] = useState(false);
  const [showErrorAlart, setShowErrorAlart] = useState(false);
  //   const [currentUser, setCurrentUser] = useState({});

  // تحميل البيانات من localStorage عند أول تحميل
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartitems");
      if (storedCartItems) {
        setcartitems(JSON.parse(storedCartItems));
      }
      setIsInitialized(true); // التأكيد أن التهيئة تمت
    }
  }, []);

  //   useEffect(() => {
  //     const getdata = async () => {
  //       try {
  //         const response = await instance.get("/currentuser");
  //         if (response.status == 200) {
  //           setCurrentUser(response.data.data);
  //         }
  //       } catch (error: any) {
  //         throw error;
  //       }
  //     };
  //     getdata();
  //   }, []);

  // تحديث localStorage فقط بعد اكتمال التهيئة
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
    }
  }, [cartitems, isInitialized]);

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
