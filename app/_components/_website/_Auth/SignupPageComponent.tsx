"use client";
import React, { useEffect, useRef, useState } from "react";
import { PiUserCircleDashedThin } from "react-icons/pi";
import { MdDriveFileRenameOutline, MdPassword, MdPhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import Img from "@/app/_components/Img";
import countries from "@/app/constants/_website/countries";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import { useSignUp, useUser } from "@clerk/nextjs";
import Loading from "../../Loading";
import ErrorAlart from "../../_popups/ErrorAlart";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SuccessAlart from "../../_popups/SuccessAlart";
import EmailVerificationStep from "./EmailVerificationStep";
import { useRouter } from "next/navigation";

export default function SignupPageComponent() {
  const { user } = useUser();
  const { locale } = UseVariables();
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const translations = getTranslations(locale);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const iconStyle = "absolute  right-2 top-1/2  -translate-y-1/2";

  useEffect(() => {
    if (user) {
      router.push(`/${locale}`);
    }
  }, [user, router, locale]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement; // استخدم destructuring
    if (type === "file" && files) {
      setForm((prevForm) => ({ ...prevForm, [name]: files[0] })); // حفظ أول ملف فقط
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleChangePasswordFildType = () => {
    setPasswordFildType((prev) => !prev);
  };

  const renderInput = (type, name, label, icon) => {
    const isNotEmpty = form[name] && form[name].trim() !== "";
    return (
      <div className={`relative w-full ${isNotEmpty ? "not-empty" : ""}`}>
        <input
          onChange={handleChange}
          type={
            name == "password" ? (passwordFildType ? "text" : "password") : type
          }
          name={name}
          value={form[name] || ""}
          className="input-style"
        />
        <label className="special-label absolute top-1/2 px-2 -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10 transition-all duration-300">
          {label}
        </label>
        {name == "password" ? (
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
            <MdPassword />
          </div>
        ) : (
          <div className="">{icon}</div>
        )}
      </div>
    );
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      label: translations.formlabels.name,
      icon: <MdDriveFileRenameOutline className={iconStyle} />,
    },
    {
      name: "email",
      type: "email",
      label: translations.formlabels.email,
      icon: <TfiEmail className={iconStyle} />,
    },
    {
      name: "password",
      type: "password",
      label: translations.formlabels.password,
      icon: <MdPassword className={iconStyle} />,
    },
    {
      name: "phone_number",
      type: "text",
      label: translations.formlabels.phone_number,
      icon: <MdPhone className={iconStyle} />,
    },
    {
      name: "birth_date",
      type: "date",
    },
  ];

  const [form, setForm] = useState({
    country: "",
    gender: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
    image: null as File | null,
  });
  const [error, setError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showError, setShowError] = useState(false);
  const [passwordFildType, setPasswordFildType] = useState(false);
  const [successMessgae, setSuccessMessgae] = useState("");
  const [showSuccessMessgae, setShowSuccessMessgae] = useState(false);

  const handleSelectGender = (gender: string) => {
    setForm({ ...form, gender: gender });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // تحقق أولاً من تحميل Clerk
    if (!isLoaded || !signUp) {
      console.warn("Clerk signUp object not ready");
      return;
    }
    try {
      // إنشاء الحساب بالبريد وكلمة المرور
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      // إرسال رمز التحقق إلى البريد
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setShowSuccessMessgae(true);
      setShowEmailVerification(true);
      setSuccessMessgae(translations.checkAccount);
      setForm({
        country: "",
        gender: "",
        name: "",
        email: "",
        password: "",
        phone_number: "",
        image: null as File | null,
      });
    } catch (error: any) {
      setShowError(true);
      setError(error.errors?.[0]?.message || "حدث خطأ ما");
    }
  };

  if (!isLoaded) return <Loading />;

  return (
    <>
      <div className="w-full h-fit flex  flex-col items-center p-6 gap-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full border border-gray-300 flex items-center justify-center">
          <Img src="/website/logo.png" className="w-24 object-contain" />
        </div>
        <div className="form w-1/2 max-lg:w-3/4 max-md:w-[95%]">
          <div className="flex flex-col items-center mb-8 gap-4 w-fit mx-auto mt-6">
            <h1 className="text-4xl max-md:text-2xl text-center font-mono text-sec-text">
              {translations.signUp.title}
            </h1>
            <p className="text-lg text-gray-600 text-center">
              {translations.signUp.longText}
            </p>
          </div>
        </div>
        <div className="flex items-start max-lg:flex-col gap-4 w-3/4 max-lg:w-[90%] max-md:w-[99%] h-fit max-lg:h-fit">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6  flex-1/2 max-lg:w-full"
          >
            <div className=" h-full  p-4 self-center flex items-center justify-center ">
              <div
                onClick={() => imageRef.current?.click()}
                id="avater"
                className="group h-[250px] w-[250px] bg-gray-50 hover:bg-secondery-green duration-300 cursor-pointer border rounded-full border-gray-300     flex items-center justify-center "
              >
                {form.image instanceof File ? (
                  <Img
                    src={URL.createObjectURL(form.image)}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <PiUserCircleDashedThin className="size-44 group-hover:text-white duration-300 text-secondery-green w-fit mx-auto" />
                )}
              </div>
            </div>
            {inputs.map((input, index) => (
              <div className="w-full" key={index}>
                {renderInput(input.type, input.name, input.label, input.icon)}
              </div>
            ))}
            <input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleChange}
              name="image"
            />
            <select
              onChange={handleChange}
              value={form.country}
              className="input-style"
              name="country"
              id=""
            >
              <option value="" disabled>
                {/* {"حدد أحد الإختيارات التالية : -"} */}
                {`${translations.formlabels.selectCountry} : -`}
              </option>
              {countries.map((country, index) => (
                <option value={country.value} key={index}>
                  {locale == "ar" ? country.name : country.name_en}
                </option>
              ))}
            </select>
            <div className="flex items-center max-md:flex-col  justify-between gap-4 w-full ">
              <div
                onClick={() => handleSelectGender("male")}
                className={`flex-1 max-lg:w-full cursor-pointer hover:bg-secondery-green duration-300 hover:text-white rounded-xl shadow-md  px-2 py-4 max-md:py-2 border border-gray-300 flex items-center justify-center gap-3 ${
                  form.gender == "male"
                    ? "bg-secondery-green text-white"
                    : "bg-[#fff]"
                }`}
              >
                <IoIosMale />
                <p>{translations.formlabels.male}</p>
              </div>
              <div
                onClick={() => handleSelectGender("femele")}
                className={`flex-1 max-lg:w-full cursor-pointer hover:bg-secondery-green duration-300 hover:text-white rounded-xl shadow-md  px-2 py-4 max-md:py-2 border border-gray-300 flex items-center justify-center gap-3 ${
                  form.gender == "femele"
                    ? "bg-secondery-green text-white"
                    : "bg-[#fff]"
                }`}
              >
                <IoIosFemale />
                <p>{translations.formlabels.femele}</p>
              </div>
            </div>
            <input
              type="submit"
              className="submit-btn w-1/2 max-lg:w-3/4 max-md:w-[99%]"
              value={translations.defaultData.signupbtn}
            />
          </form>
        </div>
      </div>
      <ErrorAlart
        Message={error}
        showAlart={showError}
        onClose={() => setShowError(false)}
      />
      <SuccessAlart
        Message={successMessgae}
        showAlart={showSuccessMessgae}
        onClose={() => setShowSuccessMessgae(false)}
      />
      <EmailVerificationStep
        show={showEmailVerification}
        setShow={setShowEmailVerification}
      />
    </>
  );
}
