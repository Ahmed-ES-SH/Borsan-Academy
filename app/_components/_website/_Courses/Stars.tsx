import React from "react";
import { FaStar } from "react-icons/fa";

interface props {
  goldStars: number;
  grayStars: number;
  size: number;
}

export default function Stars({ size, goldStars, grayStars }: props) {
  return (
    <>
      <div className="flex items-center gap-1">
        {Array.from({ length: goldStars }).map((_, index) => (
          <FaStar size={size} color="gold" key={index} />
        ))}
        {Array.from({ length: grayStars }).map((_, index) => (
          <FaStar size={size} color="gray" key={index} />
        ))}
      </div>
    </>
  );
}
