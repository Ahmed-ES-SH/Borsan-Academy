"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
interface props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchArticles({ isOpen, onClose }: props) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -500 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -500, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[99999]"
          >
            <div className="w-[90%] max-md:w-[96%] min-h-[80vh] bg-white rounded-md shadow-md relative">
              <GiTireIronCross
                onClick={onClose}
                className="absolute top-4 right-4 size-7 text-red-400 hover:rotate-360 duration-700 cursor-pointer"
              />
              <div className="flex items-center gap-1 max-md:flex-col max-md:gap-4 w-[90%]  mt-12 max-md:mt-16 mx-auto">
                <div className="relative w-full">
                  <input type="text" className="input-style block" />
                  <FaSearch className=" absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 size-6" />
                </div>
                <button className="info-btn max-md:w-[100px]">بحث</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
