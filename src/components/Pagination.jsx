import { IoMdArrowBack } from "react-icons/io";

const Pagination = ({ page, incrementPage, decrementPage }) => {
  return (
    <div className="flex gap-3 ">
      <button
        onClick={decrementPage}
        className=" border-[1px] border-black w-10 h-10  flex justify-center items-center hover:bg-black  hover:text-white"
      >
        <IoMdArrowBack />
      </button>
      <button className="border-[1px] border-black w-10 h-10 text-white bg-black ">
        {page}
      </button>

      <button
        onClick={incrementPage}
        className="border-[1px] border-black w-10 h-10  hover:bg-black flex justify-center items-center hover:text-white"
      >
        <IoMdArrowBack className="rotate-180 cursor-pointer " />
      </button>
    </div>
  );
};

export default Pagination;
