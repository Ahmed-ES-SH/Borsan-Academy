"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Img from "../Img";
import Link from "next/link";
import { linksNav } from "@/app/constants/_website/navbar";
import { CiLogin } from "react-icons/ci";
import NavLinksDropdown from "./NavLinksSidebar";
import LanguagesDrop from "./_dropdowns/LanguagesDrop";

export default function Navbar() {
  const pathname = usePathname();

  const dashboard = pathname.split("/")[1];

  if (dashboard == "dashboard") return null;

  return (
    <>
      <div className="w-full bg-thired_dash fixed z-[99999] top-0 left-0">
        <div className="max-lg:w-full p-4 w-[90%] mx-auto h-[70px]  flex items-center justify-between">
          <div className="logo group flex items-center gap-2 ">
            <Link
              href="/"
              className="flex items-center justify-center w-12 h-12 max-md:w-10 max-md:h-10 bg-white rounded-full"
            >
              <Img
                className="w-12 h-12 rounded-full max-md:w-10 max-md:h-10"
                alt="logo"
                width={200}
                height={100}
                src="/website/logo.png"
              />
            </Link>
            <div className="text-logo  flex items-center">
              <span className="text-secondery-green text-3xl max-md:text-xl font-serif">
                B-
              </span>
              <p className="font-serif group-hover:text-secondery-green duration-700 text-xl max-md:text-lg italic text-second_text">
                Academy
              </p>
            </div>
          </div>
          <div className="links max-lg:hidden flex items-center gap-4">
            {linksNav.map((link, index) => (
              <Link
                href={link.to}
                key={index}
                className="text-white flex items-center gap-1 hover:text-primary duration-200"
              >
                {link.icon}
                <p>{link.title_en}</p>
              </Link>
            ))}
          </div>
          <div className="btns flex items-center gap-2 max-lg:hidden">
            <button className="px-8 py-2 max-lg:px-3 max-lg:py-1 rounded-md bg-primary   text-white hover:bg-secondery-green   duration-200 flex items-center gap-2">
              <p>Login</p>
              <CiLogin />
            </button>
            <button className="px-8 py-2 max-lg:px-3 max-lg:py-1 rounded-md bg-fourth_dash   text-white hover:bg-secondery-green   duration-200">
              Register
            </button>
            <LanguagesDrop />
          </div>
          <NavLinksDropdown />
        </div>
      </div>
    </>
  );
}
