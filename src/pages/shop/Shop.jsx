import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import Card from "../../components/Card";
import { BeatLoader } from "react-spinners";
import { fetcher } from "../../utils/fetcher.jsx";
import Category from "../../components/category/Category";
import { IoMdArrowBack } from "react-icons/io";
import Rating from "../../components/Rating";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";
import { useEffect, useState } from "react";
const Shop = () => {
  const { data } = useSWR(API_BASE_URL + "products?limit=15", fetcher);
  const [products, setProducts] = useState(data);
  const [page, setPage] = useState(1);
  function incrementPage() {
    setPage(page < 2 ? page + 1 : page);
  }
  function decrementPage() {
    setPage(page > 1 ? page - 1 : page);
  }
  useEffect(() => {
    async function getProductsPage() {
      const res = await fetch(API_BASE_URL + `products?limit=${15 * page}`);
      const products = await res.json();
      const slicedProduct = products.slice(-15);
      setProducts(slicedProduct);
    }
    console.log(page);
    getProductsPage();
  }, [page]);
  return (
    <div>
      {!products ? (
        <div className="flex items-center justify-center h-screen text-black bg-white dark:bg-darkbg dark:text-darktext">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row pt-navtop sm:px-2 bg-graded dark:bg-darkbg">
          <div className=" flex flex-col  items-center sm:items-start pl-5 gap-10 mt-1 sm:min-w-[300px]">
            <div className=" border-[1px] border-util flex items-center p-2 dark:text-white ">
              <input
                className="bg-transparent border-none outline-none dark:bg-darkbg dark:text-white"
                type="text"
                placeholder="Search Products..."
              />
              <IoMdArrowBack className="w-full h-full text-white rotate-180 cursor-pointer bg-primary " />
            </div>
            <div className="hidden sm:flex">
              <Filter />
            </div>
            <div className="hidden sm:flex">
              <Category />
            </div>
            <div className="flex-col hidden gap-3 sm:flex">
              <h3 className="text-lg font-semibold dark:text-darktext">
                For Him
              </h3>
              <div className="flex flex-col items-start gap-10 p-1 dark:text-darktext">
                {products.length > 0 &&
                  products
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
          <div className="flex flex-col items-center justify-center mb-3 text-black bg-white rounded-md sm:items-start dark:bg-darkbg dark:text-darktext ">
            <div className="mt-5 ml-5">
              <p>
                <Link to="/">Home</Link> /{" "}
                <span className="text-primary">Store</span>
              </p>
              <h3 className="uppercase border-b-[1px] border-[#e4e4e4] dark:border-white  text-xl font-semibold">
                Our Products
              </h3>
            </div>
            <Card products={products} />
            <div className="mb-5 ml-5">
              <Pagination {...{ page, incrementPage, decrementPage }} />
            </div>
            <div className="flex self-start mb-5 ml-20 sm:hidden sm:ml-0 sm:mb-0">
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
