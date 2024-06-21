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
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage?.getItem("wishlist")) || []
  );
  const { data } = useSWR(API_BASE_URL + `products/${id}`, fetcher);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { product: product, quantity: quantity }]);
    navigate("/cart");
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, product]));
    } else {
      // If item is already in wishlist, navigate to the wishlist page
      navigate("/wishlist");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:px-10 lg:px-20 items-center min-h-screen pt-32 md:pt-24 bg-white text-black dark:bg-darkbg dark:text-darktext">
      {!data ? (
        <div className="flex justify-center items-center h-screen w-full bg-white text-black dark:bg-darkbg dark:text-darktext">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-3 bg-white text-black p-6 rounded-lg shadow-md dark:bg-darkbg dark:text-darktext">
          <Link
            to="/product"
            className="absolute -top-8 text-2xl left-5 md:left-0 text-primary hover:text-blue-700 transition"
          >
            <IoMdArrowBack />
          </Link>
          <div className="border-solid border-gray-500 border-2 rounded-lg p-6 md:p-10 flex justify-center items-center mb-6 lg:mb-0">
            <img
              className="max-w-full md:max-w-md lg:max-w-lg h-80 rounded-md"
              src={data.image}
              alt={data.title} 
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 ml-0 md:ml-10 mb-6 md:mb-0">
            <h2 className="text-3xl font-semibold mb-4">{data.title}</h2> 
            <div className="flex justify-between items-center mb-4">
              <Rating rating={data.rating.rate} id={data.id} />
            </div>
            <p className="text-lg mb-4">{data.description}</p>
            <div className="flex justify-start items-center mb-4">
              <p className="font-semibold text-xl">Quantity: </p>
              <input
                onChange={(event) =>
                  setQuantity(parseInt(event.target.value))
                }
                className="bg-white text-black placeholder-gray-800 indent-1 text-xl dark:bg-darkbg dark:text-darktext"
                min="1"
                max="100"
                type="number"
                name=""
                id=""
                value={quantity}
                required
              />
            </div>
            <div className="flex justify-start items-center mb-4">
              <p className="text-secondary text-3xl font-semibold">
                Rs. {getLocalPrice(data.price).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-center md:justify-start mt-6">
              <button
                onClick={() => addToCart(data)}
                className="bg-primary text-white w-full md:w-1/2 py-3 text-xl rounded-xl mr-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(data)}
                className="bg-primary text-white w-full md:w-1/2 py-3 text-xl rounded-xl"
              >
                {/* Conditionally render button text */}
                {wishlist.find((item) => item.id === data.id)
                  ? "View Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
