import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import Rating from "./Rating";
import { cartContext } from "../context/cartContext";
import { getLocalPrice } from "../utils/common";

const Card = ({ products }) => {
  const navigate = useNavigate();

  function handleProductClick(id) {
    navigate(`/product/${id}`);
  }

  return (
    <div className=" flex flex-wrap text-black gap-5 justify-center md:justify-start p-4 bg-white dark:bg-darkbg dark:text-darktext">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="cursor-pointer relative w-[300px] h-[250px] flex flex-col justify-center items-center border-[#e4e4e4] border-[0.8px] border-solid rounded-md hover:shadow-card group transition "
          >
            <div className="h-[150px] w-[150px]">
              <img
                src={product.image}
                alt="Items__Image"
                className="h-full w-full rounded-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="flex justify-evenly items-start w-full px-2 gap-5">
              {/*{product.title.slice(0, 40)} ...*/}
              <h4 className="">
                {product.title.length >= 20
                  ? `${product.title.slice(0, 40)}...`
                  : product.title}
              </h4>
              <div>
                <div className="discount-price">
                  <h4 className="text-secondary prose prose-lg">Rs. {getLocalPrice(product.price).toLocaleString()}</h4>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center gap-1 w-full px-2">
              <Rating rating={product.rating.rate} id={product.id} />
              <p>({product.rating.count})</p>
            </div>
            <div
              className="absolute -right-5 top-0 cursor-pointer
              bg-pink-300 text-white p-1 text-3xl flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all "
            >
              <AiFillHeart title="Favourite" className="text-red-500" />
              <div className="bg-primary p-1 text-white">
                <AiOutlineEye
                  onClick={() => handleProductClick(product.id)}
                  title="view product"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
