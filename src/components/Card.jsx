import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import Rating from "./Rating";
import { getLocalPrice } from "../utils/common";

const Card = ({ products, onRemoveWishlist }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage?.getItem("wishlist")) || []);

  function handleProductClick(id) {
    navigate(`/product/${id}`);
  }

  function handleWishlistClick(product) {
    const index = wishlist.find(item => item.id === product.id) !== undefined;
    if (!index) {
      const confirmation = window.confirm("Do you want to add this item to the wishlist?");
      if (confirmation) {
        setWishlist((prev) => [...prev, product]);
        localStorage.setItem("wishlist", JSON.stringify([...wishlist, product]));
      }
    } else {
      const confirmation = window.confirm("Do you want to remove this item?");
      if (confirmation) {
        const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
        setWishlist(updatedWishlist);
        if (onRemoveWishlist) onRemoveWishlist(product.id);
        localStorage.setItem("wishlist", JSON.stringify([...updatedWishlist]));
      }
    }
  }

  return (
    <div className="flex flex-wrap text-black gap-7 justify-center md:justify-start p-4 bg-white dark:bg-darkbg dark:text-darktext">
      {products.map((product) => (
        <div
          key={product.id}
          className="cursor-pointer relative w-[315px] h-[350px] flex flex-col justify-between border-[#e4e4e4] border-[0.8px] border-solid rounded-md overflow-hidden hover:shadow-card group transition"
        >
          <div className="h-[60%] w-full">
            <img
              src={product.image}
              alt="Items__Image"
              className="h-full w-full object-contain transition-transform transform group-hover:scale-105 duration-300"
            />
          </div>
          <div className="flex flex-col justify-between h-[40%] p-4">
            <h4 className="text-lg font-semibold mb-2">
              {product.title.length >= 20
                ? `${product.title.slice(0, 20)}...`
                : product.title}
            </h4>
            <div className="flex justify-between items-center mb-2">
              <div className="discount-price">
                <h4 className="text-secondary text-lg">
                  Rs. {getLocalPrice(product.price).toLocaleString()}
                </h4>
              </div>
              <div className="flex items-center space-x-2">
                <Rating rating={product.rating.rate} id={product.id} />
                <p>({product.rating.count})</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="group-hover:opacity-100 transition-all">
                {wishlist.find((item) => item.id === product.id) !== undefined ? (
                  <AiFillHeart
                  onClick={() => handleWishlistClick(product)}
                  title="Favourite"
                  className="text-red-500 cursor-pointer"
                />
                ) : (
                  
                  <AiOutlineHeart
                    onClick={() => handleWishlistClick(product)}
                    title="Un-Favourite"
                    className="text-red-500 cursor-pointer"
                  />
                )}
              </div>
              <div className="bg-primary p-2 rounded-full">
                <AiOutlineEye
                  onClick={() => handleProductClick(product.id)}
                  title="View Product"
                  className="text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
