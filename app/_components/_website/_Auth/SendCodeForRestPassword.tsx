"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import LocaleLink from "@/app/_components/localeLink";
import { useSignIn } from "@clerk/nextjs";

interface props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setShardEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function SendCodeForRestPassword({
  setStep,
  setShardEmail,
}: props) {
  const { isLoaded, signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!isLoaded || !signIn) {
      console.warn("Clerk signIn object not ready");
      setIsLoading(false);
      return;
    }

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
      setIsSuccess(true);
      setEmail("");
      setStep(2);
    } catch (error: any) {
      setMessage(error.errors?.[0]?.message || "حدث خطأ أثناء إرسال الرمز.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    setShardEmail(email);
  }, [email]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
      >
        <motion.form
          onSubmit={handleForgotPassword}
          className="space-y-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
              <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              نسيت كلمة المرور؟
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-style"
                required
              />
              {isSuccess && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-3 text-green-500"
                >
                  <FiCheckCircle />
                </motion.div>
              )}
            </div>
          </motion.div>

          {message && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex items-center p-4 text-sm rounded-lg ${
                isSuccess
                  ? "text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-200"
                  : "text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-200"
              }`}
            >
              {isSuccess ? (
                <FiCheckCircle className="flex-shrink-0 inline w-5 h-5 mr-2" />
              ) : (
                <FiAlertCircle className="flex-shrink-0 inline w-5 h-5 mr-2" />
              )}
              <span>{message}</span>
            </motion.div>
          )}

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري الإرسال...
              </>
            ) : (
              <>
                إرسال رابط التعيين
                <FiArrowRight className="mr-2" />
              </>
            )}
          </motion.button>

          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-gray-500 dark:text-gray-400"
          >
            تذكرت كلمة المرور؟{" "}
            <LocaleLink
              href="/login"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              العودة لتسجيل الدخول
            </LocaleLink>
          </motion.div>
        </motion.form>
      </motion.div>
    </>
  );
}
