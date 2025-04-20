import { motion } from "framer-motion";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-primary_dash)] text-white text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <FaExclamationTriangle className="text-6xl text-[var(--color-thired_dash)] mb-4" />
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg text-[var(--color-secondery_dash)] mt-2">
          الصفحة التي تبحث عنها غير موجودة.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold bg-[var(--color-primary)] text-white rounded-lg shadow-lg hover:bg-opacity-80 transition duration-300"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </motion.div>
    </div>
  );
}
