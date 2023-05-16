
import useSWR from "swr";
import { API_BASE_URL } from "../../utils/constant";
import Card from "../../components/Card";
import { BeatLoader } from "react-spinners";
import {fetcher} from "../../utils/fetcher.jsx";
const Home = () => {
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
          <h3 className="uppercase border-b-[1px] border-[#e4e4e4] dark:border-white pt-navtop text-xl font-semibold">
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
