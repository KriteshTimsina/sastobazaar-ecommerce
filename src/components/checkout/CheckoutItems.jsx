import React from "react";

import { getLocalPrice } from "../../utils/common";

const CheckoutItems = ({ items }) => {
  return (
    <div className="mt-8 space-y-3 dark:border-gray-600 rounded-lg border bg-white px-2 py-4 sm:px-6 dark:bg-darkSecondary dark:text-white">
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-col rounded-lg bg-white dark:bg-darkSecondary sm:flex-row"
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item.product.image}
              alt={item.product.title}
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{item.product.title}</span>
              <div className="flex items-center gap-5">
                <span className="float-right text-gray-400 dark:text-gray-200">
                  Quantity-{item.quantity}
                </span>
              </div>
              <p className="text-lg font-bold dark:text-gray-200">Rs. {getLocalPrice(item.product.price).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutItems;
