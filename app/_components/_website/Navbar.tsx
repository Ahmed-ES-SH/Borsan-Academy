"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { linksNav } from "@/app/constants/_website/navbar";
import { CiLogin } from "react-icons/ci";
import NavLinksDropdown from "./NavLinksSidebar";
import LanguagesDrop from "./_dropdowns/LanguagesDrop";
import { BsCart3 } from "react-icons/bs";
import { UseVariables } from "@/app/context/VariablesContext";
import { Cartcontext } from "@/app/context/CartContext";
import LocaleLink from "../localeLink";
import { directionMap } from "@/app/constants/_website/data";
import { getTranslations } from "@/app/_helpers/helpers";
import Logo from "../Logo";
import { UserButton, useUser } from "@clerk/nextjs";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import DropWishlist from "./DropWishList";

export default function Navbar() {
  const {
    toggleCart,
    toggleDropWishList,
    locale,
    setShowNavLinksDrop,
    showNavLinksDrop,
  } = UseVariables();
  const { cartitems, wishListItems } = Cartcontext();
  const { user } = useUser();
  const pathname = usePathname();

  const dashboard = pathname.split("/")[1];

  if (dashboard == "dashboard") return null;

  const CartItemsLenght = cartitems && cartitems.length;
  const wishListLenght = wishListItems && wishListItems.length;

  const translations = getTranslations(locale);

  const toggleDropdown = () => {
    setShowNavLinksDrop((prev) => !prev);
  };

  return (
    <>
      <div className="w-full bg-thired_dash fixed z-[99999]  top-0 left-0">
        <div className="max-xl:w-full p-4 w-[95%] mx-auto h-[70px]  flex items-center justify-between">
          <div className="w-fit">
            <Logo />
          </div>
          <div
            dir={directionMap[locale]}
            className="links max-xl:hidden flex items-center gap-4 "
          >
            {linksNav.map((link, index) => (
              <LocaleLink
                href={link.to}
                key={index}
                className="text-white flex items-center gap-1 hover:text-primary duration-200"
              >
                {link.icon}
                <p className="whitespace-nowrap">
                  {locale == "ar" ? link.title_ar : link.title_en}
                </p>
              </LocaleLink>
            ))}
          </div>
          <div className="btns flex items-center justify-between gap-6 max-md:gap-3 ">
            {!user && (
              <div className="flex items-center gap-2 max-lg:hidden">
                <LocaleLink
                  href={`/login`}
                  className="px-8 py-2  max-lg:px-3 max-lg:py-1 rounded-md bg-primary   text-white hover:bg-secondery-green   duration-200 flex items-center gap-2"
                >
                  <p className="whitespace-nowrap">
                    {translations.defaultData.loginbtn}
                  </p>
                  <CiLogin />
                </LocaleLink>
                <LocaleLink
                  href={"/signup"}
                  className="px-8 py-2 max-lg:px-3 max-lg:py-1 rounded-md bg-fourth_dash   text-white hover:bg-secondery-green   duration-200"
                >
                  {translations.defaultData.signupbtn}
                </LocaleLink>
              </div>
            )}

            {user && (
              <UserButton
                afterSignOutUrl="/en"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "37px",
                      height: "37px",
                    },

                    userButtonPopoverCard: {
                      zIndex: "999999",
                      marginTop: "15px",
                    },
                  },
                }}
              />
            )}

            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-2">
                <div
                  onClick={toggleCart}
                  className="cart relative cursor-pointer group"
                >
                  {CartItemsLenght > 0 && (
                    <span className="w-5 h-5 max-md:w-4 max-md:h-4 max-md:text-[12px] text-[14px] bg-primary flex items-center justify-center text-white absolute max-md:-top-2 max-md:-right-2 -top-3 -right-3 rounded-full">
                      {CartItemsLenght}
                    </span>
                  )}
                  <BsCart3 className="text-white group-hover:text-primary duration-300 size-6 max-md:size-5 " />
                </div>
                <div
                  onClick={toggleDropWishList}
                  className="cart relative cursor-pointer group"
                >
                  {wishListLenght > 0 && (
                    <span className="w-5 h-5 max-md:w-4 max-md:h-4 max-md:text-[12px] text-[14px] bg-red-400 flex items-center justify-center text-white absolute max-md:-top-2 max-md:-right-2 -top-2 -right-3 rounded-full">
                      {wishListLenght}
                    </span>
                  )}
                  <IoMdHeartEmpty
                    className={`text-white group-hover:text-red-400 duration-300 size-7 max-md:size-6  `}
                  />
                </div>
              </div>
              <LanguagesDrop />
            </div>
          </div>
          <NavLinksDropdown />
        </div>
        {!showNavLinksDrop && (
          <div
            onClick={toggleDropdown}
            className=" absolute rounded-b-md right-3 -bottom-9 w-9 h-9 bg-thired_dash flex items-center justify-center  cursor-pointer lg:hidden z-[9999]"
          >
            <HiMiniBars3CenterLeft className="text-white size-6 rotate-180 " />
          </div>
        )}
        <DropWishlist />
      </div>
    </>
  );
}
