"use client";
import React, { useMemo } from "react";
import Img from "../../Img";
import { FaBook, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FcClock, FcRating } from "react-icons/fc";
import Stars from "./Stars";
import { IoCheckmarkOutline } from "react-icons/io5";
import "../../../Css/Card.css";
import { formatTitle, getTranslations } from "@/app/_helpers/helpers";
import { Cartcontext } from "@/app/context/CartContext";
import { UseVariables } from "@/app/context/VariablesContext";
import LocaleLink from "../../localeLink";
import { directionMap } from "@/app/constants/_website/data";

interface CourseType {
  id: number;
  price: number;
  title: string;
  lessons: number;
  students: number;
  rating: number;
  courseLongbydays: number;
  image: string;
  quantity: number;
}

interface props {
  course: CourseType;
}

export default function CourseCard({ course }: props) {
  const { addToCart, cartitems, addToWishlist, wishListItems } = Cartcontext();
  const { locale } = UseVariables();
  const translations = getTranslations(locale);

  const isSelected = useMemo(() => {
    return cartitems.some((item) => item.id === course.id);
  }, [cartitems, course.id]);

  const isSelectedFotWishlist = useMemo(() => {
    return wishListItems.some((item) => item.id === course.id);
  }, [wishListItems, course.id]);

  const powerPoints = [
    translations.courseCard.powerPoint1,
    translations.courseCard.powerPoint2,
    translations.courseCard.powerPoint3,
    translations.courseCard.powerPoint4,
  ];

  return (
    <>
      <div dir={directionMap[locale]} className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="price">{course.price}.00 $</div>
            <div className="image-container">
              <Img
                src={course.image || ""}
                alt="course-image"
                className="course-image"
              />
              <div className="hover-effect"></div>
              <div className="hover-effect"></div>
            </div>
            <div className="content">
              <div className="details">
                <div className="info">
                  <FaBook className="icon" />
                  <p>
                    {course.lessons} {translations.courseCard.lessons}
                  </p>
                </div>
                <div className="info">
                  <FaBook className="icon" />
                  <p>
                    {course.students} {translations.courseCard.students}
                  </p>
                </div>
              </div>
              <h1 className="title">{course.title}</h1>
              <div className="extra-info">
                <div className="rating">
                  <FcRating />
                  <p>
                    ({course.rating} / 5 {translations.courseCard.rating})
                  </p>
                </div>
                <div className="duration">
                  <FcClock />
                  <p>
                    {course.courseLongbydays} {translations.courseCard.days}
                  </p>
                </div>
              </div>
              <div className="stars">
                <Stars
                  size={18}
                  goldStars={course.rating}
                  grayStars={5 - Math.floor(course.rating)}
                />
              </div>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="back-content">
              <span id="category">{translations.courseCard.category}</span>
              <div className="course-info">
                <h1>{course.title}</h1>
                <div className="level">
                  <span>{translations.courseCard.level}:</span>
                  <p>{translations.courseCard.beginner}</p>
                </div>
              </div>
              <p className="description">
                {translations.courseCard.description}
              </p>
              <ul className="points">
                {powerPoints.map((point, index) => (
                  <li key={index}>
                    <IoCheckmarkOutline className="icon" />
                    <p>{point}</p>
                  </li>
                ))}
              </ul>
              <div className="buttons">
                <LocaleLink
                  href={`/courses/${formatTitle(
                    course?.title || ""
                  )}?course_id=${course?.id || 1}`}
                  className="info-btn"
                >
                  {translations.courseCard.viewDetails}
                </LocaleLink>
                <div className="action-buttons">
                  {!isSelected && (
                    <button
                      onClick={() => addToCart(course)}
                      className="cart-btn"
                    >
                      <FaShoppingCart className="size-6" />
                    </button>
                  )}
                  {!isSelectedFotWishlist && (
                    <button
                      onClick={() => addToWishlist(course)}
                      className="wishlist-btn"
                    >
                      <FaHeart className="size-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
