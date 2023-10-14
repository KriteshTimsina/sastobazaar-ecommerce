import React, { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import { BeatLoader } from "react-spinners";
import Rating from "../../components/Rating";
import { IoMdArrowBack } from "react-icons/io";
import { cartContext } from "../../context/cartContext";
import { fetcher } from "../../utils/fetcher.jsx";
import { getLocalPrice } from "../../utils/common";

const Product = () => {
  const { id } = useParams();
  const { setCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data } = useSWR(API_BASE_URL + `products/${id}`, fetcher);
  const addToCart = (product) => {
    setCart((prev) => [
      ...prev,
      { product: product,  quantity: quantity },
    ]);
    navigate("/cart");
  };
  return (
    <div
      className=" flex flex-col md:flex-row md:px-10 lg:px-20 items-center min-h-screen pt-32 md:pt-24
     bg-white text-black dark:bg-darkbg dark:text-darktext"
    >
      {!data ? (
        <div className="flex justify-center items-center h-screen w-full bg-white text-black dark:bg-darkbg dark:text-darktext ">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="relative flex flex-col md:flex-row items-center gap-3">
          <Link
            to="/product"
            className="absolute -top-8 text-2xl left-5 md:left-0 text-primary hover:text-blue-700 transition"
          >
            <IoMdArrowBack />
          </Link>
          <div className="flex justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-sm lg:max-h-[400px]"
              src={data.image}
              alt={data.title}
            />
          </div>
          <div>
            <div className="flex justify-between items-center px-7 gap-2">
              <h2 className="font-semibold text-lg">{data.title}</h2>
              <p className="text-secondary">Rs. {getLocalPrice(data.price).toLocaleString()}</p>
            </div>
            <div className="flex justify-center items-center px-7">
              <p>{data.description}</p>
            </div>
            <div className="flex justify-start items-center px-7">
              <Rating rating={data.rating.rate} id={data.id} />
            </div>

            <div className="flex justify-start gap-2 md:justify-start px-7 mb-3">
              <p className="font-semibold">Quantity: </p>
              <input
                onChange={(event) => setQuantity(parseInt(event.target.value))}
                className="bg-white text-black placeholder-gray-800 indent-1"
                min="1"
                max="100"
                type="number"
                name=""
                id=""
                value={quantity}
                required
              />
            </div>

            <div className="flex justify-center md:justify-start items-center">
              <button
                onClick={() => addToCart(data)}
                className="bg-primary text-white w-full md:w-1/2  mx-10 md:mx-7 py-2 text-xl mb-14"
              >
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
