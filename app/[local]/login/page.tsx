import React from "react";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import LoginPageComponent from "@/app/_components/_website/_Auth/LoginPageComponent";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";

export async function generateMetadata({ params }) {
  const { local } = params;
  const translations = await getTranslations(local);
  const login = translations.login;
  const sharedMetadata = await getSharedMetadata(local, translations);
  return {
    title: `Borsan Academy | ${login.metaTitle}`,
    describtion: `Borsan Academy | ${login.metaDescription}`,
    ...sharedMetadata,
  };
}

export default function Login() {
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
