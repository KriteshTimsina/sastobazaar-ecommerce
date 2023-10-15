import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import Card from "../../components/Card";
import { BeatLoader } from "react-spinners";
import { fetcher } from "../../utils/fetcher.jsx";
import Category from "../../components/category/Category";
import Rating from "../../components/Rating";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Sort from "../../components/Sort";

import { getLocalPrice } from "../../utils/common";

const Shop = () => {
  const { data } = useSWR(API_BASE_URL + "products?limit=15", fetcher);
  const [products, setProducts] = useState(data);
  const [page, setPage] = useState(1);
  const [sortItems, setSortItems] = useState("");
  const navigate = useNavigate();

  function handleReset() {
    setProducts([...data]);
    setSortItems("");
  }

  useEffect(() => {
    let sortedProducts;
    switch (sortItems) {
      case "price-high":
        sortedProducts = products.sort((a, b) => b.price - a.price);
        setProducts([...sortedProducts]);
        break;
      case "price-low":
        sortedProducts = products.sort((a, b) => a.price - b.price);
        setProducts([...sortedProducts]);
        break;
      case "rating-high":
        sortedProducts = products.sort((a, b) => b.rating.rate - a.rating.rate);
        setProducts([...sortedProducts]);
        break;
      case "rating-low":
        sortedProducts = products.sort((a, b) => a.rating.rate - b.rating.rate);
        setProducts([...sortedProducts]);
        break;
    }
  }, [sortItems]);

  useEffect(() => {
    async function getProductsPage() {
      const res = await fetch(API_BASE_URL + `products?limit=${15 * page}`);
      const products = await res.json();
      const slicedProduct = products.slice(-15);
      setProducts(slicedProduct);
    }
    getProductsPage();
  }, [page]);

  const incrementPage = () => setPage(page < 2 ? page + 1 : page);
  const decrementPage = () => setPage(page > 1 ? page - 1 : page);

  return (
    <div>
      {!products ? (
        <div className="flex items-center justify-center h-screen text-black bg-white dark:bg-darkbg dark:text-darktext">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row pt-navtop sm:px-2 bg-graded dark:bg-darkbg">
          <div className=" flex flex-col  items-center sm:items-start gap-1 mt-1 sm:min-w-[300px]">
            <SearchBar />
            <Sort {...{ sortItems, setSortItems, handleReset }} />
            <div className="flex-col hidden gap-3 sm:flex">
              <h3 className="text-lg font-semibold dark:text-darktext">
                For Him
              </h3>
              <div className="flex flex-col items-start gap-10 p-1 dark:text-darktext">
                {products.length > 0 &&
                  products
                    .filter((items) => items.category === "men's clothing")
                    .map((product) => (
                      <div
                        onClick={() => navigate(`/product/${product.id}`)}
                        key={product.id}
                        className="flex gap-2 items-center border-b-[1px] w-full border-[#e4e4e4] cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          width={40}
                          height={40}
                        />

                        <div>
                          <h2>{product.title}</h2>
                          <Rating rating={product.rating.rate} />
                          <p className="text-secondary">Rs. {getLocalPrice(product.price).toLocaleString()}</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
