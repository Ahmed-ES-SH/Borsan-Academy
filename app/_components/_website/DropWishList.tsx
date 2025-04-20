"use client";
import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import { BsHeartbreak } from "react-icons/bs";
import LocaleLink from "../localeLink";
import { Cartcontext } from "@/app/context/CartContext";
import CartItem from "./CartItem";
import useClickOutside from "@/app/_helpers/useClickOutside";
import { getTranslations } from "@/app/_helpers/helpers";
import { MdClose } from "react-icons/md";

export default function DropWishlist() {
  const wishListRef = useRef<HTMLDivElement>(null);
  const { showDropWishList, setShowSideCart, setShowDropWishList, locale } =
    UseVariables();
  const { wishListItems } = Cartcontext();
  const { wishlist } = getTranslations(locale); // بإمكانك تغيير `sideCart` لـ `sideWishlist` لو عندك ترجمة منفصلة
  const pathname = usePathname();

  useClickOutside(wishListRef, () => {
    setShowSideCart(false);
    setShowDropWishList(false);
  });

  const dashboard = pathname.split("/")[1];
  if (dashboard == "dashboard") return null;

  return (
    <AnimatePresence>
      {showDropWishList && (
        <motion.div
          ref={wishListRef}
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -500, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[40vh] overflow-y-auto hidden-scrollbar w-[500px] max-lg:w-[98%] max-lg:left-1/2 max-lg:-translate-x-1/2 border border-gray-300 bg-white shadow-lg rounded-lg p-2 absolute mt-2 right-24 max-lg:right-0 "
        >
          <MdClose
            onClick={() => setShowDropWishList(false)}
            className="size-6 text-red-300 absolute top-2 left-2 cursor-pointer hover:text-red-500 "
          />
          <div className="w-full">
            {wishListItems && wishListItems.length > 0 ? (
              <>
                <div className="head">
                  <h3 className="text-lg font-light w-fit pb-1 border-b border-red-300 mb-2">
                    {wishlist.title}
                  </h3>
                </div>
                <motion.ul
                  className="w-full flex flex-col gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {wishListItems.map((item: any) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CartItem item={item} />
                    </motion.li>
                  ))}
                </motion.ul>
              </>
            ) : (
              <motion.div
                className="w-full h-[35vh] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
              >
                <div className="flex flex-col items-center">
                  <BsHeartbreak className="text-6xl text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600">
                    {wishlist.emptyTitle}
                  </h2>
                  <p className="mt-2 max-md:text-center text-gray-500">
                    {wishlist.emptyDescription}
                  </p>
                  <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-500 transition">
                    <LocaleLink href={"/courses"}>
                      {wishlist.browseButton}
                    </LocaleLink>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
