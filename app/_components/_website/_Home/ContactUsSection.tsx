/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

interface formType {
  name: string;
  email: string;
  phone_number: string;
  message: string;
}

export default function ContactUsSection() {
  const [form, setForm] = useState<formType>({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="text-center  my-12">
        <h2 className="text-5xl font-bold text-gray-900">
          Get in <span className="text-secondery-green">Touch</span>
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Have questions? We're here to help! Contact us for any inquiries.
        </p>
        <div className="w-24 h-1 bg-secondery-green mx-auto mt-4 rounded-full"></div>
      </div>
      <div className="flex items-stretch gap-3 p-4 max-md:p-2 w-[90%] mx-auto max-lg:w-full max-lg:flex-col max-lg:items-start h-[60vh] max-lg:h-fit">
        <div className="info bg-[#fff] p-4 rounded-lg border border-gray-300 shadow-md h-full flex-1">
          <h1 className="my-4 text-2xl  pb-3 border-b  border-primary w-fit">
            <span className="text-secondery-green font-bold ">B-</span>Academy
            Information
          </h1>
          <p className="text-[14px] text-light_text">
            Have questions about our courses or need assistance? Our team is
            here to help you with enrollment, course details, and any inquiries.
            Feel free to reach out—we’d love to hear from you!
          </p>

          <div className="info-information flex flex-col gap-4 mt-8">
            <div className="bg-white rounded-md  ">
              <div className="flex items-center gap-6 w-full">
                <div className="w-16 h-16  rounded-md bg-secondery-green flex items-center justify-center">
                  <FaPhone className="size-6 text-white" />
                </div>
                <div className="flex flex-col items-start flex-1/2">
                  <h1 className="text-sec-text font-light">Call anytime</h1>
                  <h2 className="text-2xl font-bold text-indigo-800">
                    518 564 3200
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md ">
              <div className="flex items-center gap-6 w-full">
                <div className="w-16 h-16  rounded-md bg-secondery-green flex items-center justify-center">
                  <TfiEmail className="size-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-sec-text font-light">Email address</h1>
                  <h2 className="text-xl font-bold text-indigo-800">
                    BorsanAcademy@info.com
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form max-lg:w-full shadow-md bg-[#fff] p-4 rounded-lg border border-gray-300 h-full flex-1/2">
          <h1 className="my-4 text-4xl font-bold">Leave A Reply</h1>
          <p className="text-light_text my-3 text-[14px]">
            Fill-up The Form and Message us of your amazing question
          </p>
          <form className="flex flex-col gap-4 items-center w-full">
            <div className="flex items-center max-lg:flex-col gap-3 w-full justify-between">
              <input
                className="input-style"
                type="text"
                name="name"
                placeholder="Your Name .... "
                onChange={handleChange}
              />
              <input
                className="input-style"
                type="text"
                name="email"
                placeholder="Your Email .... "
                onChange={handleChange}
              />
            </div>
            <input
              className="input-style"
              type="text"
              name="phone_number"
              placeholder="Your Phone Number .... "
              onChange={handleChange}
            />
            <textarea
              className="input-style h-40"
              name="message"
              placeholder="Message Here .... "
              onChange={handleChange}
            />
            <input
              type="submit"
              value={"Send Message"}
              className="submit-btn"
            />
          </form>
        </div>
      </div>
    </>
  );
}
