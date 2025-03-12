import React from "react";

interface ParamsType {
  params: {
    userId: number;
  };
}

export default function page({ params }: ParamsType) {
  const userId = params.userId;
  console.log(userId);
  return (
    <>
      <div className="w-full"></div>
    </>
  );
}
