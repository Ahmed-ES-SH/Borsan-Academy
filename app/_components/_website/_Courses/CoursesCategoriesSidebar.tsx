"use client";
import { Coursescategories } from "@/app/constants/_website/data";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GiTireIronCross } from "react-icons/gi";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { UseVariables } from "@/app/context/VariablesContext";

export default function CoursesCategoriesSidebar() {
  const { width } = UseVariables();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState(true);

  // تحويل `currentCategory` إلى مصفوفة عند التحميل
  const currentCategory = searchParams.get("currentCategory")?.split(",") || [];

  const [selectedCategories, setSelectedCategories] = useState(currentCategory);

  // تحديث الفئات المختارة عند تغيير `currentCategory`
  useEffect(() => {
    setSelectedCategories(currentCategory);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) => {
      let updatedCategories;

      if (prev.includes(String(categoryId))) {
        // إزالة الفئة إذا كانت محددة مسبقًا
        updatedCategories = prev.filter((id) => id !== String(categoryId));
      } else {
        // إضافة الفئة إذا لم تكن محددة
        updatedCategories = [...prev, String(categoryId)];
      }

      // ⚠️ تصفية الفئة ذات `id === 21`
      updatedCategories = updatedCategories.filter((id) => id !== "21");

      // تحديث الـ URL في المتصفح
      const queryString = updatedCategories.length
        ? `?currentCategory=${updatedCategories.join(",")}`
        : "";
      router.push(`/courses${queryString}`, { scroll: false });

      return updatedCategories;
    });
  };

  const handleSelectAll = () => {
    setSelectedCategories(["21"]);
  };

  useEffect(() => {
    if (width > 900) {
      setShowSidebar(true);
    }
  }, [width]);

  return (
    <>
      <motion.div
        animate={{ width: showSidebar ? "350px" : 0 }}
        transition={{ duration: 0.3 }}
        className={` h-[101vh]  z-[2] sticky top-[50px] bg-[#fff8] overflow-y-auto hidden-scrollbar max-lg:z-[999999] max-lg:bg-white max-lg:fixed max-lg:top-0 max-lg:left-0   `}
      >
        <div className="w-full ">
          <h1 className="text-xl my-3 font-bold ml-4 pb-2 border-b border-secondery-green w-fit">
            Categories
          </h1>
        </div>
        <div
          onClick={() => setShowSidebar(false)}
          className="w-8 h-8  mb-3  absolute top-3 right-1 hover:bg-white duration-150 group hover:border-red-400 border border-transparent  flex bg-red-400 rounded-md   items-center justify-center cursor-pointer  lg:hidden"
        >
          <GiTireIronCross className="size-6 text-white group-hover:text-red-400 duration-200" />
        </div>
        <div className="flex flex-col gap-5">
          {Coursescategories.map((category) => {
            const isSelected = selectedCategories.includes(String(category.id));

            return (
              <div
                key={category.id}
                onClick={
                  category.id == "21"
                    ? () => handleSelectAll()
                    : () => handleCategoryClick(category.id)
                }
                className={`flex py-4 items-center justify-between p-2 hover:scale-105 duration-200 cursor-pointer group ${
                  isSelected ? "border-r border-gray-100 bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="p-1 cursor-pointer"
                    checked={isSelected}
                    readOnly
                  />
                  <p className="text-light_text group-hover:text-secondery-green duration-300">
                    {category.title_en}
                  </p>
                </div>
                <span className="flex items-center">
                  (<p className="px-2 text-primary">{category.total_courses}</p>
                  )
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
      {!showSidebar && (
        <div
          onClick={() => setShowSidebar(true)}
          className=" lg:hidden duration-300 hover:border-primary hover:bg-white group z-[9999] fixed bottom-3 left-3 cursor-pointer w-16 h-16 bg-primary rounded-full border border-primary shadow-md flex items-center justify-center"
        >
          <FaFilter className="size-8 text-white group-hover:text-primary duration-300" />
        </div>
      )}
    </>
  );
}
