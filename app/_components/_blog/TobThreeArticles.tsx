import React from "react";
import TopArticleCard from "./TopArticleCard";
import { TopThreeArticles } from "@/app/constants/_website/data";

export default function TobThreeArticles() {
  return (
    <>
      <div className="w-full p-6 max-md:p-2 max-lg:p-4 flex items-center gap-3 min-h-[60vh] mt-16 max-xl:flex-col">
        {TopThreeArticles.map((article, index) => {
          const isLarge = article.size === "large";
          const commonClasses =
            "relative overflow-hidden rounded-md h-[60vh] max-md:h-[42vh] cursor-pointer group max-xl:w-full";
          const sideClasses =
            "max-xl:flex-1 max-lg:flex-1 w-full h-full rounded-md shadow-md overflow-hidden relative cursor-pointer group";

          return isLarge ? (
            <div key={article.id} className={`xl:flex-1/2 ${commonClasses}`}>
              <TopArticleCard {...article} />
            </div>
          ) : index === 1 ? (
            <div
              key="two-side-articles"
              className="xl:flex-1 flex flex-col max-xl:flex-row max-md:flex-col gap-6 h-[60vh] max-xl:w-full"
            >
              {[article, TopThreeArticles[index + 1]].map((a) => (
                <div key={a.id} className={sideClasses}>
                  <TopArticleCard {...a} />
                </div>
              ))}
            </div>
          ) : null;
        })}
      </div>
    </>
  );
}
