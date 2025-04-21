import { useRouter } from "next/navigation"; // استيراد Router من Next.js
import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import Img from "../../Img";

export default function LanguagesDrop() {
  const { showLangDrop, setShowLangDrop } = UseVariables();
  const router = useRouter(); // استخدام Router من Next.js

  // دالة لتبديل القائمة المنسدلة
  const toggleDropdown = () => {
    setShowLangDrop((prev) => !prev);
  };

  // دالة لتغيير اللغة
  const handleChangeLanguage = (locale) => {
    // الحصول على المسار الحالي بدون الجزء الخاص باللغة
    const currentPath =
      typeof window !== "undefined" &&
      window.location.pathname.split("/").slice(2).join("/");

    // إعادة توجيه المستخدم إلى المسار الجديد مع اللغة المحددة
    router.push(`/${locale}/${currentPath || ""}`);

    // إغلاق القائمة المنسدلة
    setShowLangDrop(false);
  };

  return (
    <div className="relative z-[9999]">
      {/* زر تبديل القائمة */}
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer group"
      >
        <HiMiniLanguage className="text-white size-6 max-md:size-5" />
        <FaChevronDown className="text-white size-2 group-hover:rotate-180 duration-500" />
      </div>

      {/* القائمة المنسدلة */}
      <AnimatePresence>
        {showLangDrop && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[200px] h-fit absolute max-lg:top-1 right-0 shad-md p-2 bg-thired_dash"
          >
            <span className="border-[10px] border-r-transparent border-t-transparent border-l-transparent border-b-thired_dash absolute -top-5 right-2"></span>
            <ul className="flex flex-col gap-3">
              {/* خيار اللغة العربية */}
              <li
                onClick={() => handleChangeLanguage("ar")}
                className="flex items-center justify-between px-2 cursor-pointer text-white duration-300 hover:text-secondery-green gap-3"
              >
                <Img src="/assets/saudi-arabia.png" className="w-10" />
                <p>العربية</p>
              </li>

              {/* خيار اللغة الإنجليزية */}
              <li
                onClick={() => handleChangeLanguage("en")}
                className="flex items-center justify-between px-2 cursor-pointer text-white duration-300 hover:text-secondery-green gap-3"
              >
                <Img src="/assets/united-states.png" className="w-10" />
                <p>English</p>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
