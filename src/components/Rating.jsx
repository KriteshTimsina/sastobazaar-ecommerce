import React, { useEffect } from "react";
import { RiStarSFill, RiStarSLine, RiStarHalfFill } from "react-icons/ri";
let id = 1;
const Rating = ({ rating }) => {
  const FULL_STAR = Math.floor(rating);
  const HALF_STAR = Math.round(rating - FULL_STAR);
  const ratings = [];

  for (let i = 0; i < FULL_STAR; i++) {
    ratings.push(<RiStarSFill key={id} />);
    id = id + 1;
  }
  if (HALF_STAR) {
    ratings.push(<RiStarHalfFill key={id} />);
    id = id + 1;
  } else {
    ratings.push(<RiStarSLine key={id} />);
    id = id + 1;
  }

  while (ratings.length != 5) {
    ratings.push(<RiStarSLine key={id} />);
    id = id + 1;
  }

  return <div className="flex text-orange-500">{ratings}</div>;
};

export default Rating;
