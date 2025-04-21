"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiLock,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useSignIn } from "@clerk/nextjs";
import { UseVariables } from "@/app/context/VariablesContext";

interface props {
  shardEmail: string;
}

export default function CheckCodeForResetPassword({ shardEmail }: props) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { locale } = UseVariables();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState(""); // كلمة المرور الجديدة
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const router = useRouter();

  const handleCheckRestPasswordCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      await setActive({ session: result.createdSessionId });
      router.push(`/${locale}`);
    } catch (err: any) {
      console.error("Error verifying reset code:", err);
      setError(err.errors?.[0]?.message || "حدث خطأ أثناء التحقق من الكود.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;
    setIsResending(true);
    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: shardEmail,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "حدث خطأ أثناء إعادة الإرسال.");
    } finally {
      setIsResending(false);
    }
  };

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
    >
      <motion.form
        onSubmit={handleCheckRestPasswordCode}
        className="space-y-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
            <FiLock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            التحقق من رمز إعادة التعيين
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            أدخل رمز التحقق وكلمة المرور الجديدة
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="verification-code"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            رمز التحقق
          </label>
          <div className="relative">
            <input
              id="verification-code"
              type="text"
              placeholder="أدخل الرمز المكون من 6 أرقام"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
              maxLength={6}
            />
            <FiClock className="absolute right-3 top-3 text-gray-400" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            كلمة المرور الجديدة
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="أدخل كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
            required
          />
        </motion.div>

        {error && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/50 dark:text-red-200"
          >
            <FiAlertCircle className="flex-shrink-0 inline w-5 h-5 mr-2" />
            <span>{error}</span>
          </motion.div>
        )}

        {resendSuccess && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900/50 dark:text-green-200"
          >
            <FiCheckCircle className="flex-shrink-0 inline w-5 h-5 mr-2" />
            <span>تم إعادة إرسال الرمز بنجاح</span>
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
              جاري التحقق...
            </>
          ) : (
            <>
              التحقق من الرمز
              <FiArrowRight className="mr-2" />
            </>
          )}
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <span>لم تستلم الرمز؟ </span>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium disabled:opacity-50"
          >
            {isResending ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
