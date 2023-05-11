import React from "react";
import { RiStarSFill, RiStarSLine, RiStarHalfFill } from "react-icons/ri";
const Rating = ({ rating }) => {
  console.log("rating: " + rating);
  const FULL_STAR = Math.floor(rating);
  const HALF_STAR = Math.round(rating - FULL_STAR);
  const ratings = [];

  let i;
  for (i = 0; i < FULL_STAR; i++) {
    ratings.push(<RiStarSFill />);
  }
  if (HALF_STAR) {
    ratings.push(<RiStarHalfFill />);
  } else {
    ratings.push(<RiStarSLine />);
  }

  while (ratings.length != 5) {
    ratings.push(<RiStarSLine />);
  }
  return (
    <div key={i} className="flex text-red-500">
      {ratings}
    </div>
  );
};

export default Rating;
