import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import Rating from "./Rating";
import { cartContext } from "../context/cartContext";
import { getLocalPrice } from "../utils/common";

const Card = ({ products, onRemoveWishlist }) => {
  const navigate = useNavigate();
  const [wishlist, setwishlist] = useState(JSON.parse(localStorage?.getItem("wishlist")) || []);

  function handleProductClick(id) {
    navigate(`/product/${id}`);
  }
  function handleWishlistClick(product) {
    const index = wishlist.find(item => item.id === product.id) !== undefined;
    if (!index) {
      const confirmation = confirm("Do you want to add this item to wishlist ?");
      if (confirmation) {
        setwishlist((prev) => {
          return [...prev, product];
        });
        localStorage.setItem("wishlist", JSON.stringify([...wishlist, product]));
      }
    }
    else {
      const confirmation = confirm("Do you want to remove this item?");
      if (confirmation) {
        const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
        setwishlist(updatedWishlist);
        if (onRemoveWishlist) onRemoveWishlist(product.id);
        localStorage.setItem("wishlist", JSON.stringify([...updatedWishlist]))
      }
    }
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
                  <h4 className="text-secondary">Rs. {getLocalPrice(product.price).toLocaleString()}</h4>
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
              {wishlist.find(item => item.id === product.id) !== undefined ? <AiOutlineHeart
                onClick={() => handleWishlistClick(product)}
                title="Un-Favourite" className="text-red-500" /> :
                <AiFillHeart
                  onClick={() => handleWishlistClick(product)}
                  title="Favourite" className="text-red-500" />}
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
