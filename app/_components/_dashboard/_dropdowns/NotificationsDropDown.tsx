import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaBell } from "react-icons/fa";
import { TbBellRingingFilled } from "react-icons/tb";

export default function NotificationsDropDown() {
  const {
    showNotificationDrop,
    setShowMessagesDrop,
    setShowNotificationDrop,
    setShowUserButton,
  } = UseVariables();

  const newnotiffication = true;
  const toggleDropdown = () => {
    setShowNotificationDrop((prev) => !prev);
    setShowUserButton(false);
    setShowMessagesDrop(false);
  };

  return (
    <div className="relative">
      <div onClick={toggleDropdown}>
        {newnotiffication ? (
          <FaBell className="text-white size-6 max-md:size-5" />
        ) : (
          <div className=" relative w-fit">
            <TbBellRingingFilled className="text-white size-6 max-md:size-5" />
            <span className=" absolute -top-2 animate-bounce right-0 w-2 h-2 rounded-full bg-red-400 flex items-center justify-center"></span>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showNotificationDrop && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[350px] h-[250px] absolute  right-0 shad-md  p-2 bg-fourth_dash "
          >
            <span className=" border-[10px] border-r-transparent border-t-transparent border-l-transparent border-b-fourth_dash absolute -top-5 right-2"></span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
