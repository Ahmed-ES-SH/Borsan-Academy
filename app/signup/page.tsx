"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { PiGreaterThan } from "react-icons/pi";
import Img from "../_components/Img";
import { MdDriveFileRenameOutline, MdPassword, MdPhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { RxAvatar } from "react-icons/rx";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import countries from "../constants/_website/countries";

export default function SignUp() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const iconStyle = "absolute  right-2 top-1/2  -translate-y-1/2";

  const renderInput = (type, name, label, icon) => {
    return (
      <div className="relative w-full">
        <input type={type} name={name} className="input-style" />
        <label className="special-label absolute top-1/2 px-2   -translate-y-1/2 left-2 text-lg text-light_text opacity-50 -z-10">
          {label}
        </label>
        {icon}
      </div>
    );
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      label: "Name",
      icon: <MdDriveFileRenameOutline className={iconStyle} />,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      icon: <TfiEmail className={iconStyle} />,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      icon: <MdPassword className={iconStyle} />,
    },
    {
      name: "phone_number",
      type: "text",
      label: "phone Number",
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

  const handleSelectGender = (gender: string) => {
    setForm({ ...form, gender: gender });
  };

  return (
    <>
      <div className="min-h-[50vh] relative bg-[url('/website/test-1.jpg')] bg-cover bg-left ">
        <div className="w-2/3 max-md:w-full h-full absolute top-0 left-0 flex items-center justify-center  opacity-95 bg-[#192335] mask-right ">
          <div className="flex flex-col items-center  xl:items-start gap-5">
            <h1 className="text-6xl max-md:text-2xl font-bold text-white">
              Start your journey
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
                <p className="text-white">Sign Up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex  flex-col items-center p-6 gap-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full border border-gray-300 flex items-center justify-center">
          <Img src="/website/logo.png" className="w-24 object-contain" />
        </div>
        <div className="form w-1/2 max-lg:w-3/4 max-md:w-[95%]">
          <div className="flex flex-col items-center mb-8 gap-4 w-fit mx-auto mt-6">
            <h1 className="text-4xl max-md:text-2xl text-center font-mono text-sec-text">
              Create an Account
            </h1>
            <p className="text-lg text-gray-600 text-center">
              Join us today! Sign up to access exclusive courses and start your
              learning journey.
            </p>
          </div>
        </div>
        <div className="flex items-start max-lg:flex-col gap-4 w-3/4 max-lg:w-[90%] max-md:w-[99%] h-[60vh] max-lg:h-fit">
          <div className="lg:border-r-2 h-full border-gray-300 p-4 self-center flex items-center justify-center ">
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
                <RxAvatar className="size-44 group-hover:text-white duration-300 text-secondery-green w-fit mx-auto" />
              )}
            </div>
          </div>
          <form className="flex flex-col gap-6  flex-1/2 max-lg:w-full">
            {inputs.map((input) =>
              renderInput(input.type, input.name, input.label, input.icon)
            )}
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
                {"Select Your Country : -"}
              </option>
              {countries.map((country, index) => (
                <option value={country.value} key={index}>
                  {country.name_en}
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
                <p>Male</p>
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
                <p>Femele</p>
              </div>
            </div>
            <input
              type="submit"
              className="submit-btn w-1/2 max-lg:w-3/4 max-md:w-[99%]"
              value={"Sign up"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
