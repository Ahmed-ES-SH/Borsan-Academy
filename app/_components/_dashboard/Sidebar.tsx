"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import { UseVariables } from "@/app/context/VariablesContext";
import { pages } from "@/app/constants/_dashboard/Sidebar";

export default function Sidebar() {
  const { showSidebar, setShowSidebar } = UseVariables();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  // حركة Framer Motion للقوائم الفرعية
  const dropdownVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4 },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  const toggleDropdown = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const toggle = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[300px] bg-primary_dash xl:mt-16 h-full max-xl:z-[99999999] max-xl:fixed top-0 left-0 overflow-y-auto py-2 shadow-md"
          >
            <div className="w-full px-3">
              <HiBars3BottomRight
                onClick={toggle}
                className="text-white hover:scale-125 duration-200 block w-fit ml-auto size-7 cursor-pointer"
              />
            </div>
            {/* روابط الصفحات */}
            <ul className="mt-4">
              {pages.map((page, index) => (
                <li key={index} className="relative">
                  <div
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-4 px-4  hover:bg-primary text-white py-3 duration-150 cursor-pointer"
                  >
                    {/* ايقونة الصفحة */}
                    {page.icon}
                    {/* اسم الصفحة */}
                    {
                      <Link
                        href={page.to}
                        className="text-sm whitespace-nowrap flex-1  duration-150"
                      >
                        {page.title}
                      </Link>
                    }
                    {/* أيقونة dropdown */}
                    {page.minilinks && page.minilinks.length > 0 && (
                      <FaChevronDown
                        className={`w-3 h-3 transition-transform ${
                          expanded[index] ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                  </div>
                  {/* روابط الفرعية */}
                  <motion.ul
                    initial="closed"
                    animate={expanded[index] ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="ml-8 overflow-hidden"
                  >
                    {page.minilinks?.map((link, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={link.to}
                          className="flex items-center gap-4 px-4 py-2 hover:bg-primary  duration-200 text-white cursor-pointer"
                        >
                          {link.icon}
                          <span className="text-sm whitespace-nowrap">
                            {link.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
