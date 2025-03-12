"use client";

import { instance } from "@/app/_helpers/axios";
import React, { useEffect, useRef, useState } from "react";
import { LuUserPen } from "react-icons/lu";
import Img from "../../Img";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import SuccessAlart from "../../_popups/SuccessAlart";
import LoadingSpin from "../../LoadingSpin";

interface InputField {
  name: string;
  type: string;
  fildType: string;
  label: { ar: string; en: string };
  placeholder?: string;
  selectItems?: { [key: string]: string }[];
}

interface Props {
  inputs: InputField[];
  api: string;
  direct: string;
  submitValue: string;
  successMessage: string;
}

interface errorType {
  [key: string]: { ar: string; en: string };
}

export default function DynamicForm({
  inputs,
  api,
  direct,
  submitValue,
  successMessage,
}: Props) {
  const router = useRouter();
  const openImageinput = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<Record<string, string | File>>({});
  const [errors, setErrors] = useState<errorType>({});
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  ///////////////////////////////////
  // start Fetch The Form Detailes
  ///////////////////////////////////

  useEffect(() => {
    const initialFormState = inputs.reduce<Record<string, string>>(
      (acc, input) => {
        acc[input.name] = "";
        return acc;
      },
      {}
    );

    setForm(initialFormState);
  }, []);

  ///////////////////////////////////
  // End Fetch The Form Detailes
  ///////////////////////////////////

  ///////////////////////////////////
  // start Functions Lines
  ///////////////////////////////////

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm({ ...form, image: files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    scrollTo(0, 0);
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value)); // تأكد أن القيمة نصية
        if (key == "image") {
          formData.append("image", form?.image);
        }
      });

      const response = await instance.post(api, formData);

      if (response.status === 201) {
        setSuccessPopup(true);

        // ✅ إعادة تعيين الحقول بطريقة صحيحة
        setForm((prevForm) =>
          Object.keys(prevForm).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {} as typeof prevForm)
        );

        setTimeout(() => {
          router.push(direct);
        }, 3000);
      }
    } catch (error) {
      console.error(error);

      // ✅ التحقق من الخطأ بطريقة أبسط باستخدام AxiosError
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const formattedErrors: errorType = Object.entries(
          error.response.data.errors
        ).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value[0] : value;
          return acc;
        }, {} as errorType);

        setErrors(formattedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlart = () => {
    setSuccessPopup(false);
  };
  ///////////////////////////////////
  // End Functions Lines
  ///////////////////////////////////

  if (loading) return <LoadingSpin />;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ direction: "rtl" }}
        className="w-[98%] h-[105vh] overflow-y-auto mx-auto max-md:w-[96%] mt-2 flex flex-col gap-3"
      >
        {inputs.map((input, index) => {
          //////////////////////
          //Normal input
          //////////////////////

          if (input.fildType == "short-text") {
            return (
              <div className="flex flex-col gap-3 " key={index}>
                <label htmlFor={input.name} className="input-label">
                  {input.label["ar"]}
                </label>
                <input
                  name={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                  value={form[input.name] as string}
                  onChange={handleChange}
                  className="input-style"
                />
                {errors[input.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[input.name]["ar"]}
                  </p>
                )}
              </div>
            );
          }

          //////////////////////
          //user Image input
          //////////////////////

          if (input.fildType == "user-image") {
            return (
              <div key={index} className="h-80">
                <div
                  onClick={() => openImageinput.current?.click()}
                  className="w-60 h-60 rounded-full  hover:-translate-y-2 hover:bg-primary text-second_text hover:text-white hover:border-white duration-200 cursor-pointer  mx-auto border-2  border-second_text flex items-center justify-center "
                >
                  {form?.image instanceof File ? (
                    <Img
                      src={URL.createObjectURL(form?.image)}
                      className="w-60 h-60  rounded-full"
                    />
                  ) : (
                    <LuUserPen className="size-24 " />
                  )}
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    ref={openImageinput}
                  />
                  {errors[input.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[input.name]["ar"]}
                    </p>
                  )}
                </div>
              </div>
            );
          }

          //////////////////////
          //Select Eelement
          //////////////////////

          if (input.fildType == "select-type") {
            return (
              <div key={index} className="w-full flex flex-col gap-2">
                <label htmlFor={input.name} className="input-label">
                  {input.label["ar"]}
                </label>
                <select
                  onChange={handleChange}
                  name={input.name}
                  className="select-style"
                  defaultValue={
                    form[input.name] ? (form[input.name] as string) : ""
                  }
                >
                  <option value="" disabled>
                    {"حدد أحد الإختيارات التالية : -"}
                  </option>
                  {input.selectItems &&
                    input.selectItems.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {errors[input.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[input.name]["ar"]}
                  </p>
                )}
              </div>
            );
          }

          return null;
        })}
        <input type="submit" value={submitValue} className="submit-btn" />
      </form>
      <SuccessAlart
        showAlart={successPopup}
        onClose={handleCloseAlart}
        Message={successMessage}
      />
    </>
  );
}
