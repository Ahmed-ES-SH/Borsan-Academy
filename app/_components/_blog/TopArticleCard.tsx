"use client";
import { FaComments } from "react-icons/fa";
import Img from "../Img";
import { BsCalendar2DateFill } from "react-icons/bs";
import { VscReactions } from "react-icons/vsc";
import Link from "next/link";
import { formatTitle } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";
import { directionMap } from "@/app/constants/_website/data";

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

  return (
    <div dir={directionMap[locale]}>
      <Link
        href={`/blog/${formatTitle(title[locale])}?article_id=${id}`}
        className={`title overflow-hidden absolute z-[10] w-full ${
          size == "large"
            ? "group-hover:h-[160px] h-[90px]"
            : "group-hover:h-[130px] h-[80px]"
        }  max-xl:h-[60px] group-hover:max-xl:h-[120px] duration-300 bottom-0 left-0 bg-black/50 p-2`}
      >
        <h1
          className={`text-white hover:text-primary duration-200 font-raleway  font-semibold ${
            size == "large"
              ? "text-3xl max-2xl:text-xl"
              : "text-2xl max-2xl:text-lg"
          } max-xl:text-xl`}
        >
          {title[locale]}
        </h1>
      </Link>
      <Img
        src={image}
        alt={formatTitle(title[locale])}
        className="rounded-md w-full h-full z-[2] absolute top-0 left-0 object-cover group-hover:scale-125 duration-500"
      />
      <div className="flex items-center justify-between z-[10] w-full p-4 absolute -top-40 group-hover:top-3 left-0 duration-300">
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
      <div className="flex items-center justify-between z-[10] w-full p-4 absolute -bottom-40 group-hover:bottom-3 left-0 duration-300">
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
    </div>
  );
};

export default TopArticleCard;
