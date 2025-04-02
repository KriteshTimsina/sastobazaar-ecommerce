import React from "react";

type PricingProps = {
  price: number;
  discountedPrice: number;
};

const Pricing = ({ price, discountedPrice }: PricingProps) => {
  return (
    <div>
      {discountedPrice ? (
        <div className="flex gap-2 items-center">
          <span className="text-lg font-bold">
            Rs.
            {discountedPrice}
          </span>
          <span className="text-sm text-red-500 line-through">Rs.{price}</span>
        </div>
      ) : (
        <span className="text-lg font-bold">Rs. {price}</span>
      )}
    </div>
  );
};

export default Pricing;
