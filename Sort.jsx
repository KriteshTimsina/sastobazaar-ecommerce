import React from "react";

const Sort = ({sortItems,setSortItems}) => {
  return (
    <div className="text-lg flex flex-col gap-3 ">
      <div className="flex flex-col md:flex-row items-center justify-between w-[250px]">
      <h3 className="font-semibold dark:text-darktext">SORT BY</h3>
      <select value={sortItems} onChange={(e)=>setSortItems(e.target.value)} className="dark:bg-darkbg p-1 dark:text-white dark:border-primary border-[1px] border-black rounded-sm">
        <option  value=" ">SORT BY</option>
        <option value="price-high">Price &uarr;</option>
        <option value="rating-high">Rating &uarr;</option>
        <option value="price-low">Price &darr;</option>
        <option value="rating-low">Rating &darr;</option>
      </select>
      </div>
      <hr/>
    </div>
  );
};

export default Sort;
