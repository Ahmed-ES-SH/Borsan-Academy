import LoginPageComponent from "@/app/_components/_website/_Auth/LoginPageComponent";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import React from "react";

export default function SignIn() {
  const links = [
    {
      title_en: "Home",
      title_ar: "الرئيسية",
      href: "/",
    },
    {
      href: "/",
      title_ar: "تسجيل دخول",
      title_en: "Login",
    },
  ];

  const mainTitle = {
    ar: "تسجيل دخول",
    en: "Login",
  };
  return (
    <>
      <HeroBanner
        imagesrc="/website/sign-bg.webp"
        mainTitle={mainTitle}
        titleSize="text-6xl"
        height="35vh"
        links={links}
      />
      <LoginPageComponent />
    </>
  );
}
