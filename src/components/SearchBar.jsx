import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { API_BASE_URL } from "../utils/constant";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { data } = useSWR(API_BASE_URL + `products?${search}`, fetcher);

  useEffect(() => {
    const result = setTimeout(() => {
      const filteredProducts = data?.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
    }, 300);

    return () => clearInterval(result);
  }, [search, data]);

  return (
    <>
      <div className="mb-1 border-[1px] bg-white w-3/4 rounded-md border-util flex items-center justify-between p-2 dark:text-white md:w-[280px] dark:bg-darkbg">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border-none outline-none dark:bg-darkbg dark:text-white w-full "
          type="text"
          placeholder="Search Products..."
        />
        {search.length > 0 && (
          <button onClick={() => setSearch("")}>
            <RxCross1 className="w-full h-full text-primary cursor-pointer " />
          </button>
        )}
      </div>
      {products && search.length > 0 ? (
        <div className="h-auto w-3/4 sm:w-[300px] top-32 bg-slate-200 absolute z-10 flex flex-col  text-black mb-2 hover:shadow-sm hover:shadow-white dark:bg-darkbg dark:shadow-lg dark:shadow-white gap-1">
          {products.map((product) => {
            return (
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                key={product.id}
                className="flex items-center justify-start gap-5 px-2 bg-blue-100 dark:bg-darkbg dark:text-white hover:bg-primary cursor-pointer p-1 border-b-[1px] border-b-slate-200 h-20"
              >
                <img src={product.image} className="w-14 max-h-14" />
                <div>
                  <h2>{product.title.slice(0, 40)}</h2>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
