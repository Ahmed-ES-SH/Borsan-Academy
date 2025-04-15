"use client";
import React from "react";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { UseVariables } from "@/app/context/VariablesContext";
import Img from "../Img";
import { Cartcontext } from "@/app/context/CartContent";

export default function CartItem({ item }: any) {
  const { language } = UseVariables();
  // const { decreasequantity, increasequantity, removefromcard } = Cartcontext();
  const { removefromcard } = Cartcontext();
  return (
    <>
      <div className="flex items-center gap-4 pb-4 border-b last:border-b-0">
        <Img
          src={item.image ? item.image : "/assets/course-1.jpg"}
          className="w-20 object-contain"
        />

        <div>
          <h3 className="text-sm text-gray-900 dark:text-secend_text">
            {language == "en"
              ? item.title.length > 35
                ? item.title.slice(0, 35) + "..."
                : item.title
              : item.title}
          </h3>
          <div className="text-[12px] flex items-center gap-1 dark:text-white">
            {language == "en" ? "price" : "السعر"} :
            <span className="px-2  font-bold text-[13px] dark:text-white">
              <div className="flex items-center gap-1">
                <span>$</span>
                <p>{Number(item.price).toFixed(2)}</p>
              </div>
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* <div>
            <label htmlFor="Quantity" className="sr-only">
              {language == "en" ? "Quantity" : "الكمية"}
            </label>

            <div className="flex items-center justify-center  border dark:border-gray-600 rounded-sm shadow-sm px-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => decreasequantity(item)}
                  type="button"
                  className="  text-gray-600 transition hover:opacity-75"
                >
                  <AiOutlineMinus />
                </button>
                <p className="dark:text-white p-2 text-center">
                  {item.quantity}
                </p>
                <button
                  onClick={() => increasequantity(item)}
                  type="button"
                  className="  text-gray-600 transition hover:opacity-75"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </div> */}

          <button
            onClick={() => removefromcard(item)}
            className="text-gray-600 transition hover:text-red-600 duration-200"
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
