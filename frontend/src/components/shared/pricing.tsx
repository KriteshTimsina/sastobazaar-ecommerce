import React from "react";

type PricingProps = {
  price: number;
  discountPercent: number;
};

const Pricing = ({ price, discountPercent }: PricingProps) => {
  const discountedPrice = Math.ceil(price - (price * discountPercent) / 100);

  return (
    <div>
      {discountPercent > 0 ? (
        <div className="flex items-center gap-2">
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
