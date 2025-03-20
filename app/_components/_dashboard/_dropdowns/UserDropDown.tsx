"use client";
import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Img from "../../Img";
import { FaAngleDown } from "react-icons/fa";

export default function UserDropDown() {
  const {
    showUserButton,
    setShowMessagesDrop,
    setShowNotificationDrop,
    setShowUserButton,
  } = UseVariables();
  const email = "Ahmed@mail.com";
  const name = "Ahmed";

  const toggleDropdown = () => {
    setShowUserButton((prev) => !prev);
    setShowNotificationDrop(false);
    setShowMessagesDrop(false);
  };
  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="flex items-center gap-2 ">
        <Img
          src="/defaults/default-male.png"
          className="border border-white shadow-md cursor-pointer rounded-full w-10 h-10  max-md:w-8 max-md:h-8"
        />
        <div className="flex flex-col text-[12px] text-white">
          <div className="flex items-center gap-2">
            <p className="max-md:hidden">
              {name.length > 15 ? name.slice(0, 15) + "..." : name}
            </p>
            <FaAngleDown />
          </div>
          <p className="max-md:hidden">
            {email.length > 20 ? email.slice(0, 20) + "..." : email}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {showUserButton && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[250px] h-[200px] absolute  right-0 shad-md  p-2 bg-primary "
          >
            <span className=" border-[10px] border-r-transparent border-t-transparent border-l-transparent border-b-primary absolute -top-5 right-2"></span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
