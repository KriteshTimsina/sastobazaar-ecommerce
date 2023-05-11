import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import { BeatLoader } from "react-spinners";

const Product = () => {
  const { id } = useParams();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(API_BASE_URL + `products/${id}`, fetcher);
  console.log(data);
  return (
    <div className="flex flex-col lg:flex-row items-center h-screen pt-20 ">
      {!data ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-3">
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
              <p className="text-red-500">${data.price}</p>
            </div>
            <div className="flex justify-center items-center px-7">
              <p>{data.description}</p>
            </div>
            <div className="flex justify-start items-center px-7 my-2 gap-2">
              <p className="font-semibold">Size</p>
              <select name="" id="" className="border border-1">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </select>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-red-400 w-full mx-10 py-2 text-xl">
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
