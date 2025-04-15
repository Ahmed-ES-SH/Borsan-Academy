"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { linksNav } from "@/app/constants/_website/navbar";
import { CiLogin } from "react-icons/ci";
import NavLinksDropdown from "./NavLinksSidebar";
import LanguagesDrop from "./_dropdowns/LanguagesDrop";
import { BsCart3 } from "react-icons/bs";
import { UseVariables } from "@/app/context/VariablesContext";
import { Cartcontext } from "@/app/context/CartContent";
import LocaleLink from "../localeLink";
import { directionMap } from "@/app/constants/_website/data";
import { getTranslations } from "@/app/_helpers/helpers";
import Logo from "../Logo";

export default function Navbar() {
  const { toggleCart, locale } = UseVariables();
  const { cartitems } = Cartcontext();
  const pathname = usePathname();

  const dashboard = pathname.split("/")[1];

  if (dashboard == "dashboard") return null;

  const CartItemsLenght = cartitems && cartitems.length;

  const translations = getTranslations(locale);

  return (
    <>
      <div className="w-full bg-thired_dash fixed z-[99999] top-0 left-0">
        <div className="max-lg:w-full p-4 w-[90%] mx-auto h-[70px]  flex items-center justify-between">
          <Logo />
          <div
            dir={directionMap[locale]}
            className="links max-lg:hidden flex items-center gap-4"
          >
            {linksNav.map((link, index) => (
              <LocaleLink
                href={link.to}
                key={index}
                className="text-white flex items-center gap-1 hover:text-primary duration-200"
              >
                {link.icon}
                <p>{locale == "ar" ? link.title_ar : link.title_en}</p>
              </LocaleLink>
            ))}
          </div>
          <div className="btns flex items-center gap-2 max-lg:hidden">
            <LocaleLink
              href={`/login`}
              className="px-8 py-2  max-lg:px-3 max-lg:py-1 rounded-md bg-primary   text-white hover:bg-secondery-green   duration-200 flex items-center gap-2"
            >
              <p>{translations.defaultData.loginbtn}</p>
              <CiLogin />
            </LocaleLink>
            <LocaleLink
              href={"/signup"}
              className="px-8 py-2 max-lg:px-3 max-lg:py-1 rounded-md bg-fourth_dash   text-white hover:bg-secondery-green   duration-200"
            >
              {translations.defaultData.signupbtn}
            </LocaleLink>
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
                <BsCart3 className="text-white group-hover:text-primary duration-300 size-6  " />
              </div>
              <LanguagesDrop />
            </div>
          </div>
          <NavLinksDropdown />
        </div>
      </div>
    </>
  );
}
