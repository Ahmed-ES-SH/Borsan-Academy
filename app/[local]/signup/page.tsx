import React from "react";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import SignupPageComponent from "@/app/_components/_website/_Auth/SignupPageComponent";

export async function generateMetadata({ params }) {
  const { local } = params;
  const translations = getTranslations(local);
  const signup = translations.signUp;
  const sharedMetadata = getSharedMetadata(local, translations);
  return {
    title: `Borsan Academy | ${signup.metaTitle}`,
    describtion: `Borsan Academy | ${signup.metaDescription}`,
    ...sharedMetadata,
  };
}

export default function SignUpPage({ params }) {
  const locale = params.local;
  const translations = getTranslations(locale);

  const links = [
    {
      title_en: "Home",
      title_ar: "الرئيسية",
      href: "/",
    },
    {
      href: "/",
      title_ar: "إنشاء حساب",
      title_en: "Sign Up",
    },
  ];

  const mainTitle = {
    ar: translations.signUp.mainTitle,
    en: translations.signUp.mainTitle,
  };

  return (
    <>
      <HeroBanner
        height="40vh"
        links={links}
        mainTitle={mainTitle}
        titleSize="text-6xl"
        imagesrc={"/website/sign-bg.webp"}
      />
      <SignupPageComponent />
    </>
  );
}
