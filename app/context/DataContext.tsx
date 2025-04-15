"use client";
import { useContext, createContext, ReactNode, useState } from "react";
// import FetchData from "../_helpers/FetchData";
// import { main_api } from "../_helpers/axios";

interface DataContextType {
  categories: {
    data: { [key: string]: string }[];
  };
  loading: boolean;
  setLoading: any;
  setCategories: any;
}

// إنشاء السياق مع القيم الافتراضية
const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<DataContextType["categories"]>({
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const data = await FetchData(
  //         `${main_api}/article-categories?page=1`,
  //         true
  //       );
  //       setCategories(data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <DataContext.Provider
      value={{ loading, setLoading, categories, setCategories }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default function useDataContext(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
