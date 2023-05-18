import { IoMdArrowBack } from "react-icons/io";

const Pagination = () => {
  return (
    <div className="flex gap-3 ">
      <button className="hidden border-[1px] border-black w-10 h-10  hover:bg-black  hover:text-white">
        <IoMdArrowBack />
      </button>
      <button className="border-[1px] border-black w-10 h-10 text-white bg-black ">
        1
      </button>
      <button className="border-[1px] border-black w-10 h-10  hover:bg-black  hover:text-white">
        2
      </button>
      <button className="border-[1px] border-black w-10 h-10 hover:bg-black hover:text-white ">
        3
      </button>
      <button className="border-[1px] border-black w-10 h-10  hover:bg-black flex justify-center items-center hover:text-white">
        <IoMdArrowBack className="cursor-pointer rotate-180  " />
      </button>
    </div>
  );
};

export default Pagination;
