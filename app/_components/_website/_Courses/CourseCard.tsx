import React from "react";
import Img from "../../Img";
import { FaBook, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FcClock, FcRating } from "react-icons/fc";
import Stars from "./Stars";
import { IoCheckmarkOutline } from "react-icons/io5";
import Link from "next/link";
import "../../../Css/Card.css";
import { formatTitle } from "@/app/_helpers/helpers";

interface props {
  course: {
    id: number;
    price: number;
    title: string;
    lessons: number;
    students: number;
    rating: number;
    courseLongbydays: number;
    image: string;
  };
}

export default function CourseCard({ course }: props) {
  const powerPoints = [
    "Scratch to HTML",
    "Learn how to code in Python",
    "Unlimited backend database creation",
    "Adobe XD Tutorials",
  ];

  return (
    <>
      <div className="flip-card">
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
                  <p>{course.lessons} lessons</p>
                </div>
                <div className="info">
                  <FaBook className="icon" />
                  <p>{course.students} students</p>
                </div>
              </div>
              <h1 className="title">{course.title}</h1>
              <div className="extra-info">
                <div className="rating">
                  <FcRating />
                  <p>({course.rating} / 5 rating)</p>
                </div>
                <div className="duration">
                  <FcClock />
                  <p>{course.courseLongbydays} day</p>
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
              <span id="category">Bussiness</span>
              <div className="course-info">
                <h1>{course.title}</h1>
                <div className="level">
                  <span>Level:</span>
                  <p>Beginner</p>
                </div>
              </div>
              <p className="description">
                Knowledge is power. Information is liberating. Education is the
                premise of progress, in every society, in every family.
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
                <Link
                  href={`/courses/${formatTitle(
                    course?.title || ""
                  )}?course_id=${course?.id || 1}`}
                  className="info-btn"
                >
                  View Details
                </Link>
                <div className="action-buttons">
                  <button className="cart-btn">
                    <FaShoppingCart className="size-6" />
                  </button>
                  <button className="wishlist-btn">
                    <FaHeart className="size-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
