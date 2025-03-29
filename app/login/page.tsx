import Link from "next/link";
import React from "react";
import { PiGreaterThan } from "react-icons/pi";
import Img from "../_components/Img";
import { FaAt, FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <>
      <div className="min-h-[50vh] relative bg-[url('/website/test-1.jpg')] bg-cover bg-left ">
        <div className="w-2/3 max-md:w-full h-full absolute top-0 left-0 flex items-center justify-center  opacity-95 bg-[#192335] mask-right ">
          <div className="flex flex-col items-center  xl:items-start gap-5">
            <h1 className="text-7xl max-md:text-2xl font-bold text-white">
              Welcome Back
            </h1>
            <div className="flex items-center gap-3 ">
              <Link
                href={"/"}
                className="flex items-center  gap-3 text-light_text hover:text-white duration-200"
              >
                <p className="">Home</p>
                <PiGreaterThan className="size-4 " />
              </Link>
              <div className="flex items-center  gap-3 text-light_text">
                <p className="text-white">Login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col items-center p-6 gap-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full border border-gray-300 flex items-center justify-center">
          <Img src="/website/logo.png" className="w-24 object-contain" />
        </div>
        <div className="form w-1/2 max-lg:w-3/4 max-md:w-[95%]">
          <div className="flex flex-col items-center mb-8 gap-4 w-fit mx-auto mt-6">
            <h1 className="text-4xl font-mono  text-sec-text">Hello Again !</h1>
            <p className="text-lg text-gray-600 text-center">
              Welcome back! Log in to access your account and continue your
              learning journey with us.
            </p>
          </div>
          <form className="flex flex-col gap-8">
            <div className="relative">
              <input type="text" className="input-style" />
              <label className="special-label absolute top-1/2 px-2   -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
                Email
              </label>
              <FaAt className=" absolute text-primary right-2 top-1/2  -translate-y-1/2 " />
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input type="text" className="input-style" />
                <label className="special-label absolute top-1/2 -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
                  Password
                </label>
                <FaLock className=" absolute text-primary right-2 top-1/2  -translate-y-1/2 " />
              </div>
              <div
                id="forget-password"
                className="underline w-fit ml-auto text-primary"
              >
                Forget Your Password ?{" "}
              </div>
            </div>
            <input
              type="submit"
              className="submit-btn w-1/2 max-lg:w-3/4 max-md:w-[95%]"
              value={"Login"}
            />
          </form>
          <div className="my-12 flex items-center gap-2">
            <span className="block w-full h-[2px] bg-gray-200 rounded-lg"></span>
            <p className="font-light">Or</p>
            <span className="block w-full h-[2px] bg-gray-200 rounded-lg"></span>
          </div>
          <div className="my-8 w-1/2 max-lg:w-3/4 max-md:w-[95%] mx-auto   flex flex-col  items-center justify-center  gap-4">
            <div className="flex w-full items-center justify-center gap-4 rounded-full p-3 border cursor-pointer bg-gray-50 hover:bg-secondery-green hover:text-white hover:border-secondery-green duration-300">
              <Img src="/assets/google.png" className="w-8 object-contain" />
              <p>Sign in With Google </p>
            </div>
            <div className="flex items-center gap-1">
              <p>You don`t have Account ?</p>
              <Link
                className="text-sky-400 hover:text-sky-600 underline"
                href={"/signup"}
              >
                signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
