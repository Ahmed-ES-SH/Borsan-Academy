"use client";
import { linksNav, socialIcons } from "@/app/constants/_website/navbar";
import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import Img from "../Img";
import { GiTireIronCross } from "react-icons/gi";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { CiLogin } from "react-icons/ci";
import LanguagesDrop from "./_dropdowns/LanguagesDrop";
import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import { Cartcontext } from "@/app/context/CartContent";

export default function NavLinksSidebar() {
  const { cartitems } = Cartcontext();
  const { showNavLinksDrop, setShowNavLinksDrop, toggleCart } = UseVariables();
  const router = useRouter();

  const handleGo = (direct: string) => {
    router.push(direct);
    setShowNavLinksDrop(false);
  };

  const toggleDropdown = () => {
    setShowNavLinksDrop((prev) => !prev);
  };

  const CartItemsLenght = cartitems && cartitems.length;

  return (
    <div className="relative lg:hidden">
      <div
        onClick={toggleDropdown}
        className=" absolute rounded-b-md right-0 -bottom-14 w-9 h-9 bg-thired_dash flex items-center justify-center  cursor-pointer"
      >
        <HiMiniBars3CenterLeft className="text-white size-6 rotate-180 " />
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={toggleCart}
          className="cart relative cursor-pointer group"
        >
          {CartItemsLenght > 0 && (
            <span className="w-5 h-5 text-[14px] bg-primary flex items-center justify-center text-white absolute -top-3 -right-3 rounded-full">
              {CartItemsLenght}
            </span>
          )}
          <BsCart3 className="text-white group-hover:text-primary duration-300 size-5  " />
        </div>
        <LanguagesDrop />
      </div>
      <AnimatePresence>
        {showNavLinksDrop && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=" h-screen w-full   rounded-md py-6 fixed  -top-9 right-0 bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ right: "-100%" }}
              animate={{ right: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-1/3 overflow-hidden max-md:w-3/4 h-screen overflow-y-auto py-8 px-2 max-[20rem]:w-[200px] bg-thired_dash fixed top-0 "
            >
              <div
                onClick={toggleDropdown}
                className=" absolute top-2 right-4 text-red-400 cursor-pointer hover:rotate-360 duration-700"
              >
                <GiTireIronCross className="size-6" />
              </div>
              <div className="logo flex items-center gap-1 pb-2 border-b border-gray-300">
                <div className="w-16 h-16 max-md:w-8 max-md:h-8 bg-white rounded-full">
                  <Img src="/website/logo.png" className="w-16 max-md:w-8" />
                </div>
                <div className="text-logo  flex items-center">
                  <span className="text-primary text-3xl max-md:text-xl font-serif">
                    B-
                  </span>
                  <p className="font-serif text-xl max-md:text-lg italic text-second_text">
                    Academy
                  </p>
                </div>
              </div>
              <ul className="w-full flex flex-col gap-5 mt-6">
                {linksNav.map((link, index) => (
                  <li
                    key={index}
                    onClick={() => handleGo(link.to)}
                    className="w-full cursor-pointer group pb-3  text-white relative flex items-center gap-2"
                  >
                    {link.icon}
                    <p className="">{link.title_en}</p>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-none z-[3] shadow-primary duration-300 animate-pulse group-hover:w-full group-hover:shadow-[0_0_10px_2px] "></span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-300 z-[2]"></span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-4 ">
                  <FiPhone className="size-12 max-md:size-6 max-lg:size-10 text-secondery-green" />
                  <div className="flex flex-col gap-1">
                    <p className="text-light_text text-[14px]">Call Now</p>
                    <p className="text-white text-[15px]">+201017539419</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <TfiEmail className="size-12 max-md:size-6 max-lg:size-10 text-secondery-green" />
                  <div className="flex flex-col gap-1">
                    <p className="text-light_text text-[14px]">Send Email</p>
                    <p className="text-white text-[15px]">
                      BorsanAcademy@info.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="btns flex flex-col w-full items-center gap-4 mt-6 ">
                <button className="px-8 py-3 max-md:py-2 w-full max-lg:px-3  rounded-sm bg-primary   text-white hover:bg-secondery-green   duration-200 flex items-center gap-2">
                  <p>Login</p>
                  <CiLogin />
                </button>
                <button className="px-8 py-3 max-md:py-2 w-full text-left max-lg:px-3  rounded-sm bg-fourth_dash   text-white hover:bg-secondery-green   duration-200">
                  Register
                </button>
              </div>
              <div className="absolute bottom-1 left-0 w-full grid grid-cols-4">
                {socialIcons.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-500 py-2 cursor-pointer hover:text-secondery-green text-white duration-300  flex items-center justify-center"
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
