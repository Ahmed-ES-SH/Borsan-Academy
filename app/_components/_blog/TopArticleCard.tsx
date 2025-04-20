"use client";
import { FaComments } from "react-icons/fa";
import Img from "../Img";
import { BsCalendar2DateFill } from "react-icons/bs";
import { VscReactions } from "react-icons/vsc";
import { formatTitle } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";
import { directionMap } from "@/app/constants/_website/data";
import LocaleLink from "../localeLink";

interface ArticleType {
  id: number;
  title: { ar: string; en: string };
  author: {
    name: string;
    image: string;
  };
  image: string;
  comments: number;
  date: string;
  reactions: number;
  size: string;
}

const TopArticleCard = ({
  id,
  title,
  author,
  image,
  comments,
  date,
  reactions,
  size,
}: ArticleType) => {
  const { locale } = UseVariables();
  const basicStyle =
    "bg-black/40 absolute bottom-0 left-0 w-full z-[10]  duration-200 p-2 group-hover:bg-black/70 ";
  const largeStyle = `h-[110px] group-hover:h-[160px] ${basicStyle}`;
  const smallStyle = `h-[80px] group-hover:h-[130px] ${basicStyle}`;

  return (
    <LocaleLink href={`/blog/${formatTitle(title[locale])}?article_id=${id}`}>
      <div
        dir={directionMap[locale]}
        className={size == "large" ? largeStyle : smallStyle}
      >
        <h1
          className={`text-white hover:text-sky-500 duration-200 ${
            size == "large" ? "text-2xl" : "text-xl"
          }`}
        >
          {title[locale]}
        </h1>
      </div>
      <Img
        src={image}
        alt={formatTitle(title[locale])}
        className="rounded-md w-full h-full z-[2] absolute top-0 left-0 object-cover group-hover:scale-125 duration-500"
      />
      <div
        dir={directionMap[locale]}
        className="flex items-center justify-between z-[10] w-full p-4 absolute -top-40 group-hover:top-3 left-0 duration-300"
      >
        <div className="flex items-center gap-2">
          <Img
            src="/defaults/default-male.png"
            alt="author"
            className="rounded-full w-8 xl:w-12"
          />
          <p className="text-white">{author?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaComments className="text-secondery-green size-6 xl:size-8" />
          <p className="text-white">{comments}</p>
        </div>
      </div>
      <div
        dir={directionMap[locale]}
        className="flex items-center justify-between z-[10] w-full p-4 absolute -bottom-40 group-hover:bottom-3 left-0 duration-300"
      >
        <div className="flex items-center gap-2">
          <BsCalendar2DateFill className="text-secondery-green size-6 xl:size-8" />
          <p className="text-white">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <VscReactions className="text-secondery-green size-6 xl:size-8" />
          <p className="text-white">{reactions}</p>
        </div>
      </div>
      <div className="w-full h-0 absolute top-0 left-1/2 -translate-x-1/2 group-hover:h-full bg-black/70 duration-300 opacity-50 z-[8]" />
    </LocaleLink>
  );
};

export default TopArticleCard;
