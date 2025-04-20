"use client";
import React from "react";
import { FaAt, FaLock } from "react-icons/fa";
import Img from "@/app/_components/Img";
import { getTranslations } from "@/app/_helpers/helpers";
import LocaleLink from "@/app/_components/localeLink";
import { UseVariables } from "@/app/context/VariablesContext";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

export default function LoginPageComponent() {
  const { locale } = UseVariables();
  const { signIn } = useSignIn();
  const { login } = getTranslations(locale);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: `/${locale}`,
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors);
        console.error(err, null, 2);
      });
  };

  return (
    <>
      <div
        dir={locale == "ar" ? "rtl" : "ltr"}
        className="w-full h-fit flex flex-col items-center p-6 gap-6"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full border border-gray-300 flex items-center justify-center">
          <Img src="/website/logo.png" className="w-24 object-contain" />
        </div>
        <div className="form w-1/2 max-lg:w-3/4 max-md:w-[95%]">
          <div className="flex flex-col items-center mb-8 gap-4 w-fit mx-auto mt-6">
            <h1 className="text-4xl font-mono  text-sec-text">
              {login.helloTitle}
            </h1>
            <p className="text-lg text-gray-600 text-center">
              {login.helloText}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="relative">
              <input type="text" className="input-style" />
              <label className="special-label absolute top-1/2 px-2 -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
                {login.email}
              </label>
              <FaAt className=" absolute text-primary right-2 top-1/2 -translate-y-1/2 " />
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input type="text" className="input-style" />
                <label className="special-label absolute top-1/2 -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
                  {login.password}
                </label>
                <FaLock className=" absolute text-primary right-2 top-1/2 -translate-y-1/2 " />
              </div>
              <div
                id="forget-password"
                className="underline cursor-pointer w-fit ml-auto text-primary"
              >
                {login.forgetPassword}
              </div>
            </div>
            <input
              type="submit"
              className="submit-btn w-1/2 max-lg:w-3/4 max-md:w-[95%]"
              value={login.submit}
            />
          </form>
          <div className="my-12 flex items-center gap-2">
            <span className="block w-full h-[2px] bg-gray-200 rounded-lg"></span>
            <p className="font-light">{login.or}</p>
            <span className="block w-full h-[2px] bg-gray-200 rounded-lg"></span>
          </div>
          <div className="my-8 w-1/2 max-lg:w-3/4 max-md:w-[95%] mx-auto flex flex-col items-center justify-center gap-4">
            <div
              onClick={() => signInWith("oauth_google")}
              className="flex w-full items-center justify-center gap-4 rounded-full p-3 border cursor-pointer bg-gray-50 hover:bg-secondery-green hover:text-white hover:border-secondery-green duration-300"
            >
              <Img src="/assets/google.png" className="w-8 object-contain" />
              <p>{login.google}</p>
            </div>
            <div className="flex items-center gap-1">
              <p>{login.noAccount}</p>
              <LocaleLink
                className="text-sky-400 hover:text-sky-600 underline"
                href={"/signup"}
              >
                {login.signup}
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
