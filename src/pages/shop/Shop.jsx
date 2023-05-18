import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import Card from "../../components/Card";
import { BeatLoader } from "react-spinners";
import { fetcher } from "../../utils/fetcher.jsx";
import Category from "../../components/category/Category";
import { IoMdArrowBack } from "react-icons/io";
import Rating from "../../components/Rating";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";
const Shop = () => {
  const [filteredRange, setFilteredRange] = useState(25);
  const { data } = useSWR(API_BASE_URL + "products", fetcher);
  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center h-screen bg-white text-black dark:bg-darkbg dark:text-darktext">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row pt-navtop sm:px-2 bg-graded dark:bg-darkbg">
          <div className=" flex flex-col  items-center sm:items-start pl-5 gap-10 mt-1 sm:min-w-[300px]">
            <div className=" border-[1px] border-util flex items-center p-2 dark:text-white ">
              <input
                className="border-none outline-none bg-transparent dark:bg-darkbg dark:text-white"
                type="text"
                placeholder="Search Products..."
              />
              <IoMdArrowBack className="cursor-pointer rotate-180 bg-primary text-white h-full w-full " />
            </div>
            <div className="hidden sm:flex">
              <Filter />
            </div>
            <div className="hidden sm:flex">
              <Category />
            </div>
            <div className=" hidden sm:flex flex-col gap-3">
              <h3 className="font-semibold text-lg dark:text-darktext">
                For Him
              </h3>
              <div className="flex flex-col items-start gap-10 dark:text-darktext p-1">
                {data
                  .filter((items) => items.category === "men's clothing")
                  .map((product) => (
                    <div className="flex gap-2 items-center border-b-[1px] w-full border-[#e4e4e4]">
                      <img
                        src={product.image}
                        alt={product.title}
                        width={40}
                        height={40}
                      />

                      <div>
                        <h2>{product.title}</h2>
                        <Rating rating={product.rating.rate} />
                        <p className="text-secondary">${product.price}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div
            className="rounded-md mb-3 flex justify-center flex-col items-center bg-white sm:items-start text-black dark:bg-darkbg dark:text-darktext
        "
          >
            <div className="ml-5 mt-5">
              <p>
                <Link to="/">Home</Link> /{" "}
                <span className="text-primary">Store</span>
              </p>
              <h3 className="uppercase border-b-[1px] border-[#e4e4e4] dark:border-white  text-xl font-semibold">
                Our Products
              </h3>
            </div>
            <Card products={data} />
            <div className="ml-5 mb-5">
              <Pagination />
            </div>
            <div className="flex sm:hidden  self-start ml-20 sm:ml-0 mb-5 sm:mb-0">
              <Category />
            </div>
            <div className="flex sm:hidden ">
              <Filter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
