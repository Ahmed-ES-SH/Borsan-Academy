import Image from "next/image";
import React from "react";

interface props {
  src: string;
  className: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager" | undefined;
}

export default function Img({
  src,
  className,
  width = 1024,
  height = 1280,
  alt = "image",
  loading = "lazy",
}: props) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
      />
    </>
  );
}
