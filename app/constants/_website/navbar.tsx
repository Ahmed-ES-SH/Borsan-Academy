import { BiHome, BiBook, BiPhone, BiNews } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export const linksNav = [
  {
    title_en: "Home",
    title_ar: "الرئيسية",
    to: "/",
    icon: <BiHome className="size-6 text-secondery-green" />,
  },
  {
    title_en: "Courses",
    title_ar: "الدورات",
    to: "/courses",
    icon: <BiBook className="size-6 text-secondery-green" />,
  },
  // { title_en: "About Us", title_ar: "من نحن", to: "/about", icon: <BiInfoCircle /> },
  {
    title_en: "Contact",
    title_ar: "اتصل بنا",
    to: "/contact",
    icon: <BiPhone className="size-6 text-secondery-green" />,
  },
  {
    title_en: "Blog",
    title_ar: "المدونة",
    to: "/blog",
    icon: <BiNews className="size-6 text-secondery-green" />,
  },
  // { title_en: "FAQ", title_ar: "الأسئلة الشائعة", to: "/faq", icon: <BiHelpCircle /> },
  // { title_en: "Login", title_ar: "تسجيل الدخول", to: "/login", icon: <BiLogIn /> },
  // { title_en: "Register", title_ar: "إنشاء حساب", to: "/register", icon: <BiUserPlus /> }
];

export const socialIcons = [
  {
    icon: <FaFacebook className=" size-6" />,
    to: "#",
  },
  {
    icon: <FaInstagram className=" size-6" />,
    to: "#",
  },
  {
    icon: <FaYoutube className=" size-6" />,
    to: "#",
  },
  {
    icon: <BsTwitterX className=" size-6" />,
    to: "#",
  },
];
