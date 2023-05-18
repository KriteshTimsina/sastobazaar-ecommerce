import { fetcher } from "../../utils/fetcher.jsx";
import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant.js";

const Category = () => {
  const { data } = useSWR(API_BASE_URL + `products/categories`, fetcher);
  return (
    <div className="flex sm:items-start flex-col gap-3 text-lg w-full">
      <h2 className="font-semibold dark:text-darktext">Categories</h2>
      {data?.map((category) => {
        return (
          <h4
            className="cursor-pointer hover:text-primary dark:text-darktext dark:hover:text-primary"
            key={category}
          >
            {category}
          </h4>
        );
      })}
    </div>
  );
};

export default Category;
