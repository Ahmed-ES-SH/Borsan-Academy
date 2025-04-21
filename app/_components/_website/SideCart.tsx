"use client";
import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef } from "react";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem";
import { Cartcontext } from "@/app/context/CartContext";
import { GiTireIronCross } from "react-icons/gi";
import { getTranslations } from "@/app/_helpers/helpers";
import { directionMap } from "@/app/constants/_website/data";
import LocaleLink from "../localeLink";
import { loadStripe } from "@stripe/stripe-js";
import useClickOutside from "@/app/_helpers/useClickOutside";

export default function SideCart() {
  const cartRef = useRef<HTMLDivElement>(null);
  const {
    showSideCart,
    toggleCart,
    setShowSideCart,
    setShowDropWishList,
    locale,
  } = UseVariables();
  const { cartitems } = Cartcontext();
  const { sideCart } = getTranslations(locale);
  const pathname = usePathname();
  const router = useRouter();

  useClickOutside(cartRef, () => {
    setShowSideCart(false);
    setShowDropWishList(false);
  });

  const dashboard = pathname.split("/")[1];

  if (dashboard == "dashboard") return null;

  const subtotal = cartitems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const formatFirstTwoCharFromEveryCourse = () => {
    if (cartitems && cartitems.length > 0) {
      const courseShortTitles = cartitems.map((course) => {
        return course.title.slice(0, 2).toUpperCase(); // أخذ أول حرفين من اسم الكورس
      });
      return courseShortTitles.join(" "); // دمج الأحرف مع فاصل بينهما
    }
    return ""; // إرجاع نص فارغ إذا كانت cartitems غير موجودة
  };

  const CoursesText = formatFirstTwoCharFromEveryCourse();

  const productDetails = {
    productName: CoursesText,
    amount: subtotal, // المبلغ بالدولار
    currency: "usd",
    quantity: cartitems && cartitems.length,
    locale: locale,
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDetails),
    });
    const data = await res.json();

    if (data.sessionId) {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    }
  };

  const handleGO = async () => {
    toggleCart();
    router.push(`/${locale}/cart`);
  };

  return (
    <AnimatePresence>
      {showSideCart && (
        <motion.div
          ref={cartRef}
          dir={directionMap[locale]}
          initial={{ x: "-100%" }}
          animate={{ x: "0" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.6 }}
          className="z-[9999999] w-[450px] hidden-scrollbar fixed top-0 left-0 max-lg:w-1/2 max-md:w-[90%] bg-white p-6 max-md:p-2 h-screen overflow-y-auto shadow-lg"
        >
          <div
            id="cart-head"
            className="flex items-center justify-between w-full"
          >
            <h2 className="font-mono font-bold text-xl pb-3 border-b border-secondery-green ">
              {sideCart.shoppingCart}
            </h2>

            <GiTireIronCross
              onClick={toggleCart}
              className="size-6 max-md:size-5 font-bold cursor-pointer text-red-300 hover:text-red-500"
            />
          </div>
          <div
            id="items"
            className="w-full mt-12 pb-2 border-b border-gray-300"
          >
            {cartitems && cartitems.length > 0 ? (
              <motion.ul
                className="w-full flex flex-col gap-4 min-h-[35vh]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {cartitems.map((item: any) => (
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
            ) : (
              <motion.div
                className="w-full h-[50vh] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BsCartX className="text-6xl text-gray-400 mb-4 " />
                  <motion.h2
                    className="text-xl font-semibold text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {sideCart.yourCartIsEmpty}
                  </motion.h2>
                  <motion.p
                    className="mt-2 max-md:text-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {sideCart.looksLikeEmpty}
                  </motion.p>
                  <motion.button
                    className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-500 transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    onClick={() => (window.location.href = "/shop")} // إضافة الرابط إلى المتجر
                  >
                    <LocaleLink href={"/courses"}>
                      {sideCart.startShopping}
                    </LocaleLink>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </div>
          {/* NUmbers + btns */}
          <div className="flex items-center justify-between mb-6 mt-12">
            <h1 className="text-2xl max-md:text-xl font-bold text-gray-800 font-raleway">
              {sideCart.subtotal}
            </h1>
            <span className="text-2xl max-md:text-xl font-bold text-primary">
              ${subtotal && Number(subtotal).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-3 w-[80%] mx-auto max-md:w-full max-lg:w-[90%] mt-12">
            <button
              onClick={handleGO}
              id="view-cart"
              className=" w-full hover:bg-secondery-green hover:text-white duration-300 py-4 flex items-center justify-center text-sky-400 border border-gray-200 rounded-md  bg-white"
            >
              {sideCart.viewCart}
            </button>
            {cartitems.length > 0 && (
              <button
                onClick={handleCheckout}
                className="w-full hover:bg-secondery-green hover:text-white duration-300 py-4 flex items-center justify-center text-sky-400 border border-gray-200 rounded-md  bg-white"
                id="Checkout"
              >
                {sideCart.checkout}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
