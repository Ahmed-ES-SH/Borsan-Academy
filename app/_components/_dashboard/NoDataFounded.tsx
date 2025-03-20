import React from "react";
import Img from "../Img";

export default function NoDataFounded() {
  return (
    <>
      <div className="w-full h-[90vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Img src="/defaults/no-data.png" className="w-96" />
          <p className="text-4xl max-lg:text-2xl max-md:text-xl text-indigo-500">
            عفوا لا توجد بيانات ليتم عرضها فى الوقت الحالى
          </p>
        </div>
      </div>
    </>
  );
}
