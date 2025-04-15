"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";

interface props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchArticles({ isOpen, onClose }: props) {
  const { locale } = UseVariables();
  const { search_articles } = getTranslations(locale);
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
            <div className="w-[90%] max-md:w-[96%] min-h-[80vh] bg-white rounded-md shadow-md relative p-6">
              {/* زر إغلاق */}
              <GiTireIronCross
                onClick={onClose}
                className="absolute top-4 right-4 size-7 text-red-400 hover:rotate-360 duration-700 cursor-pointer"
              />

              {/* العنوان والنص التوضيحي */}
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                {search_articles.search_title}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {search_articles.search_description}
              </p>

              {/* الحقل الإدخالي وزر البحث */}
              <div className="flex items-center gap-4 max-md:flex-col max-md:gap-4 w-full mt-12 max-md:mt-16 mx-auto">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={search_articles.search_placeholder}
                    className="input-style block w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 size-6" />
                </div>
                <button className="info-btn px-6 py-2 rounded-md bg-primary text-white hover:bg-secondary transition-all duration-300">
                  {search_articles.search_button}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
