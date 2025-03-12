"use client";
import React from "react";
import Img from "../Img";
import { HiBars3BottomRight } from "react-icons/hi2";
import { UseVariables } from "@/app/context/VariablesContext";
import UserDropDown from "./_dropdowns/UserDropDown";
import ConversationsDropDown from "./_dropdowns/ConversationsDropDown";
import NotificationsDropDown from "./_dropdowns/NotificationsDropDown";

export default function Topbar() {
  const { setShowSidebar, showSidebar } = UseVariables();

  const toggle = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-[99999] h-[70px] bg-fourth_dash shadow-md">
        <div className="w-[95%] h-full  mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiBars3BottomRight
              onClick={toggle}
              className={`text-white hover:scale-125 duration-200 block w-fit ml-auto size-7 cursor-pointer ${
                showSidebar ? " opacity-0 z-[-2]" : "opacity-100 z-1"
              }`}
            />

            <div className="flex items-center justify-center w-12 h-12 max-md:w-10 max-md:h-10 bg-white rounded-full">
              <Img
                className="w-12 h-12 rounded-full max-md:w-10 max-md:h-10"
                src="/website/logo.png"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 cursor-pointer">
            <UserDropDown />
            <ConversationsDropDown />
            <NotificationsDropDown />
          </div>
        </div>
      </div>
    </>
  );
}
