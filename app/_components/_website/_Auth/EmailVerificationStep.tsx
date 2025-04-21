"use client";

import { useSignUp } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import { RxCross1 } from "react-icons/rx";

interface props {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

export default function EmailVerificationStep({ setShow, show }: props) {
  const { locale } = UseVariables();
  const { emailVerification } = getTranslations(locale);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isLoaded || !signUp) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: result.createdSessionId });
      router.push(`/${locale}`);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "رمز التحقق غير صحيح");
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

  const handleClose = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-screen flex items-center justify-center fixed top-0 left-0 z-[99999] bg-black/50 backdrop-blur-md"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-md relative w-[95%] mx-auto p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800"
          >
            <RxCross1
              onClick={handleClose}
              className="top-4 right-4 absolute text-red-400 cursor-pointer size-6"
            />
            <motion.form
              onSubmit={handleVerify}
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                  <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {emailVerification.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {emailVerification.subtitle}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="verification-code"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 my-2  w-fit"
                >
                  {emailVerification.verificationLabel}
                </label>
                <div className="relative">
                  <input
                    id="verification-code"
                    type="text"
                    placeholder={emailVerification.verificationPlaceholder}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="input-style"
                    required
                  />
                  {code && (
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
                    {emailVerification.submitting}
                  </>
                ) : (
                  emailVerification.submitButton
                )}
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="text-center text-sm text-gray-500 dark:text-gray-400"
              >
                {emailVerification.resendPrompt}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  onClick={() => signUp?.prepareEmailAddressVerification()}
                >
                  {emailVerification.resendButton}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
