import React, { useState } from "react";

export default function SearchInput({
  placeholder = "أدخل محتوى البحث هنا ........",
}) {
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  return (
    <>
      <div className="w-[80%] max-md:w-[95%] mx-auto my-4  flex items-center gap-2">
        {
          <button
            className={`info-btn ${
              content.length > 0 ? "opacity-100 z-10" : "opacity-0 -z-10"
            }`}
          >
            بحث
          </button>
        }
        <div className="input-container">
          <input
            id="search"
            placeholder={placeholder}
            onChange={handleChange}
            dir="rtl"
            className="input-style"
          />
        </div>
      </div>
    </>
  );
}
