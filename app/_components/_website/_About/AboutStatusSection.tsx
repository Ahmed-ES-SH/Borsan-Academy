import { statsData } from "@/app/constants/_website/data";
import React from "react";
import Img from "../../Img";

export default function AboutStatusSection() {
  return (
    <>
      <div className="mt-[20rem] mb-2 border-b border-gray-300 w-[80%] mx-auto min-h-[50vh] flex items-center justify-center ">
        <div className="w-full my-12 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-lg:gap-12">
          {statsData.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-4 items-center"
            >
              <Img src={item.image} className="w-20 object-contain" />
              <h3 className="font-bold text-4xl max-lg:text-2xl max-md:text-xl">
                {item.MainNumber}
              </h3>
              <p className="text-light_text font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
