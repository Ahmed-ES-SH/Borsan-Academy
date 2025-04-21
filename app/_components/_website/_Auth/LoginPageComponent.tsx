"use client";
import React, { useEffect, useState } from "react";
import { FaAt, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Img from "@/app/_components/Img";
import { getTranslations } from "@/app/_helpers/helpers";
import LocaleLink from "@/app/_components/localeLink";
import { UseVariables } from "@/app/context/VariablesContext";
import { useSignIn, useUser } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "next/navigation";
import ErrorAlart from "../../_popups/ErrorAlart";
import Loading from "../../Loading";
import { VscLoading } from "react-icons/vsc";
import { motion } from "framer-motion";

export default function LoginPageComponent() {
  const { user } = useUser();
  const { locale } = UseVariables();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { login } = getTranslations(locale);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${locale}`);
    }
  }, [user, router, locale]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [passwordFildType, setPasswordFildType] = useState(false);
  const [showError, setShowError] = useState(false);
  const [trySign, setTrySign] = useState(false);

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

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setTrySign(true);
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      await setActive({ session: result.createdSessionId });
      router.push(`/${locale}`); // أو أي صفحة بعد تسجيل الدخول
    } catch (err: any) {
      setShowError(true);
      setError(err.errors?.[0]?.message || "حدث خطأ ما");
    } finally {
      setTrySign(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePasswordFildType = () => {
    setPasswordFildType((prev) => !prev);
  };

  const isEmailNotEmpty = form["email"] && form["email"].trim() !== "";
  const isPasswordNotEmpty = form["password"] && form["password"].trim() !== "";

  if (!isLoaded) return <Loading />;

  return (
    <>
      <div
        dir={locale == "ar" ? "rtl" : "ltr"}
        className="w-full h-fit flex flex-col items-center p-6 gap-6"
      >
        <div className="w-24 h-24 bg-gray-200 rounded-full border border-gray-300 flex items-center justify-center">
          <Img src="/website/logo.png" className="w-24 object-contain" />
        </div>
        <div className="form w-1/2 max-xl:w-3/4 max-md:w-[95%]">
          <div className="flex flex-col items-center mb-8 gap-4 w-fit mx-auto mt-6">
            <h1 className="text-4xl font-mono  text-sec-text">
              {login.helloTitle}
            </h1>
            <p className="text-lg text-gray-600 text-center">
              {login.helloText}
            </p>
          </div>
          <form onSubmit={handleSignIn} className="flex flex-col gap-8">
            <div
              className={`relative w-full ${
                isEmailNotEmpty ? "not-empty" : ""
              }`}
            >
              <input
                name="email"
                onChange={handleChange}
                type="text"
                className="input-style"
              />
              <label className="special-label absolute top-1/2 px-2 -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
                {login.email}
              </label>
              <FaAt className=" absolute text-primary right-2 top-1/2 -translate-y-1/2 " />
            </div>
            <div className="flex flex-col gap-2">
              <div
                className={`relative w-full ${
                  isPasswordNotEmpty ? "not-empty" : ""
                }`}
              >
                <input
                  name="password"
                  onChange={handleChange}
                  type={passwordFildType ? "text" : "password"}
                  className="input-style"
                />
                <label className="special-label absolute top-1/2 -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
                  {login.password}
                </label>
                <div className="flex items-center gap-1 absolute text-primary right-2 top-1/2 -translate-y-1/2">
                  {form.password.length > 0 && (
                    <div onClick={handleChangePasswordFildType} className="">
                      {passwordFildType ? (
                        <FaEyeSlash className="size-5 text-gray-400 cursor-pointer" />
                      ) : (
                        <FaEye className="size-5 text-gray-400 cursor-pointer" />
                      )}
                    </div>
                  )}
                  <FaLock />
                </div>
              </div>
              <LocaleLink
                href="/forgot-password"
                className="underline cursor-pointer w-fit ml-auto text-primary"
              >
                {login.forgetPassword}
              </LocaleLink>
            </div>
            <button
              type="submit"
              className="submit-btn  w-1/2 flex items-center justify-center gap-1 max-lg:w-3/4 max-md:w-[95%]"
            >
              {trySign && (
                <motion.div
                  animate={{ rotate: "360deg" }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <VscLoading />
                </motion.div>
              )}
              <p>{login.submit}</p>
            </button>
          </form>
          <div className="my-12 flex items-center gap-2">
            <span className="block w-full h-[2px] bg-gray-200 rounded-lg"></span>
            <p className="font-light">{login.or}</p>
            <span className="block w-full h-[2px] bg-gray-200 rounded-lg"></span>
          </div>
          <div className="my-8 w-1/2 max-xl:w-3/4 max-md:w-[95%] mx-auto flex flex-col items-center justify-center gap-4">
            <div
              onClick={() => signInWith("oauth_google")}
              className="flex w-full items-center justify-center gap-4 rounded-full p-3 border cursor-pointer bg-gray-50 hover:bg-secondery-green hover:text-white hover:border-secondery-green duration-300"
            >
              <Img src="/assets/google.png" className="w-8 object-contain" />
              <p>{login.google}</p>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
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
      <ErrorAlart
        Message={error}
        showAlart={showError}
        onClose={() => setShowError(false)}
      />
    </>
  );
}
