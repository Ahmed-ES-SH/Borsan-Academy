"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import LocaleLink from "../../localeLink";

export default function ResetPassword({ code }: { code: string }) {
  const { isLoaded, signIn } = useSignIn();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("كلمة المرور وتأكيدها غير متطابقين");
      setIsLoading(false);
      return;
    }

    if (!isLoaded || !signIn) {
      console.warn("Clerk signIn object not ready");
      setIsLoading(false);
      return;
    }

    try {
      await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      setMessage("تم إعادة تعيين كلمة المرور بنجاح!");
      setIsSuccess(true);
    } catch (error: any) {
      setMessage(error.errors?.[0]?.message || "حدث خطأ أثناء إعادة التعيين");
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
    >
      <motion.form
        onSubmit={handleResetPassword}
        className="space-y-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
            <FiLock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            تعيين كلمة مرور جديدة
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            اختر كلمة مرور قوية لتأمين حسابك
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            كلمة المرور الجديدة
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور الجديدة"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-style"
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            يجب أن تحتوي على 8 أحرف على الأقل
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            تأكيد كلمة المرور
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-style"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
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
              جاري الحفظ...
            </>
          ) : (
            "تأكيد كلمة المرور الجديدة"
          )}
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <LocaleLink
            href="/login"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            العودة إلى صفحة تسجيل الدخول
          </LocaleLink>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
