"use client";
import React from "react";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { UseVariables } from "@/app/context/VariablesContext";
import Img from "../Img";
import { Cartcontext } from "@/app/context/CartContext";
import { getTranslations } from "@/app/_helpers/helpers";
import { TiDeleteOutline } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import { FaTrash } from "react-icons/fa";

export default function CartItem({ item }: any) {
  const { locale, showSideCart, showDropWishList } = UseVariables();
  const { removefromcard, removefromwishList, addToCart } = Cartcontext();
  const { CourseCardDetailes } = getTranslations(locale);
  return (
    <>
      <div className="flex items-center gap-4 pb-4 border-b last:border-b-0">
        <Img
          src={item.image ? item.image : "/assets/course-1.jpg"}
          className="w-20 object-contain"
        />

        <div>
          <h3 className="text-sm max-md:text-[13px] text-gray-900 dark:text-secend_text">
            {locale == "en"
              ? item.title.length > 35
                ? item.title.slice(0, 35) + "..."
                : item.title
              : item.title}
          </h3>
          <div className="text-[12px] flex items-center  dark:text-white">
            {locale == "en" ? "price" : "السعر"} :
            <span className="px-2  font-bold text-[13px] dark:text-white">
              <div className="flex items-center gap-1">
                <span>$</span>
                <p>{Number(item.price).toFixed(2)}</p>
              </div>
            </span>
          </div>
        </div>

        {showDropWishList && (
          <div className="flex flex-col  flex-1 items-end  gap-2">
            <button
              onClick={() => removefromwishList(item)}
              className=" group  text-red-400 hover:text-red-600  duration-200"
            >
              <TiDeleteOutline className="size-6 group-hover:scale-110" />
            </button>
            <button
              onClick={() => addToCart(item)}
              className="info-btn px-2 py-1 text-[14px] whitespace-nowrap max-md:text-[12px] flex items-center gap-1"
            >
              <GoPlus className="size-5 max-md:size-4" />
              {CourseCardDetailes.add_to_cart}
            </button>
          </div>
        )}
        {showSideCart && (
          <div className="flex flex-col  flex-1 items-end  gap-2">
            <button
              onClick={() => removefromcard(item)}
              className=" group  text-red-400 hover:text-red-600  duration-200"
            >
              <FaTrash className="size-4  text-gray-600 hover:text-red-500 duration-150 group-hover:scale-110" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
