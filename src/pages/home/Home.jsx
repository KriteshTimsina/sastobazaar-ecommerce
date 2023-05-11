import React from "react";
import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import Card from "../../components/Card";
import { BeatLoader } from "react-spinners";

const Home = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(API_BASE_URL + "products", fetcher);
  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center h-screen bg-white text-black dark:bg-darkbg dark:text-darktext">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div
          className="flex justify-center flex-col items-center bg-white text-black dark:bg-darkbg dark:text-darktext
        "
        >
          <h3 className="uppercase border-b-[1px] border-[#e4e4e4] dark:border-white pt-20 text-xl font-semibold">
            {" "}
            Our Products
          </h3>
          <Card products={data} />
        </div>
      )}
    </div>
  );
};

export default Home;
