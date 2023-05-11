import React from "react";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import { BeatLoader } from "react-spinners";
import Rating from "../../components/Rating";
import { IoMdArrowBack } from "react-icons/io";

const Product = () => {
  const { id } = useParams();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(API_BASE_URL + `products/${id}`, fetcher);
  return (
    <div className=" flex flex-col md:flex-row md:px-10 lg:px-20 items-center h-screen pt-14 ">
      {!data ? (
        <div className="flex justify-center items-center h-screen w-full ">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="relative flex flex-col md:flex-row items-center gap-3">
          <Link
            to="/"
            className="absolute -top-5 text-2xl left-5 md:left-0 text-primary hover:text-blue-700 transition"
          >
            <IoMdArrowBack />
          </Link>
          <div className="flex justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-sm"
              src={data.image}
              alt={data.title}
            />
          </div>
          <div>
            <div className="flex justify-between items-center px-7 gap-2">
              <h2 className="font-semibold text-lg">{data.title}</h2>
              <p className="text-secondary">${data.price}</p>
            </div>
            <div className="flex justify-center items-center px-7">
              <p>{data.description}</p>
            </div>
            <div className="flex justify-start items-center px-7">
              <Rating rating={data.rating.rate} />
            </div>
            <div className="flex justify-start items-center px-7 my-2 gap-2">
              <p className="font-semibold">Size</p>
              <select name="" id="" className="border border-1">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </select>
            </div>
            <div className="flex justify-center md:justify-start items-center">
              <button className="bg-primary text-white w-full md:w-1/2  mx-10 md:mx-7 py-2 text-xl mb-14">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
