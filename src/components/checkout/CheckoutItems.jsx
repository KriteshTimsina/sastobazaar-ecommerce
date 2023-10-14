import React from "react";

import { getLocalPrice } from "../../utils/common";

const CheckoutItems = ({ items }) => {
  return (
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item.product.image}
              alt={item.product.title}
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{item.product.title}</span>
              <div className="flex items-center gap-5">
                <span className="float-right text-gray-400">
                  Quantity-{item.quantity}
                </span>
              </div>
              <p className="text-lg font-bold">Rs. {getLocalPrice(item.product.price).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutItems;
