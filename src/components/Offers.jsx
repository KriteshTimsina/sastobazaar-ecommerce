import React from "react";
import { GiWorld, GiPriceTag, GiClothes } from "react-icons/gi";
const Offers = () => {
  return (
    <div className="flex flex-col gap-10 pb-5 sm:flex-row sm:justify-center sm:px-5">
      <div className="flex flex-col items-center sm:border-[#e4e4e4] sm:border-[1px] sm:w-[300px]">
        <GiWorld size={100} />
        <h3 className="font-bold">Nationwide Shipping</h3>
        <p className="w-56 text-center sm:w-full">
          Goods delivered to your doorstep as fast as possible
        </p>
      </div>
      <div className="flex flex-col items-center sm:border-[#e4e4e4] sm:border-[1px] sm:w-[300px]">
        <GiClothes size={100} />
        <h3 className="font-bold">Quality that matters</h3>
        <p className="w-56 text-center sm:w-full">
          Best quality products from our vendors
        </p>
      </div>
      <div className="flex flex-col items-center sm:border-[#e4e4e4] sm:border-[1px] sm:w-[300px]">
        <GiPriceTag size={100} />
        <h3 className="font-bold">Best Offers</h3>
        <p className="w-56 text-center sm:w-full">
          Get your hands dirty with best offers and prices in every product
        </p>
      </div>
    </div>
  );
};

export default Offers;
