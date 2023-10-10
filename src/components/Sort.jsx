import React from "react";
import { GrPowerReset } from "react-icons/gr";

const Sort = ({ sortItems, setSortItems, handleReset }) => {
  return (
    <div className="text-lg flex flex-col gap-3 ">
      <div className="flex items-center  justify-center md:justify-between w-[250px] gap-2">
        <select
          value={sortItems}
          onChange={(e) => setSortItems(e.target.value)}
          className="w-2/3 dark:bg-darkbg p-2 dark:text-white  border-[1px] border-slate-300 rounded-sm"
        >
          <option value="">SORT BY</option>
          <option value="price-high">Price &uarr;</option>
          <option value="rating-high">Rating &uarr;</option>
          <option value="price-low">Price &darr;</option>
          <option value="rating-low">Rating &darr;</option>
        </select>
        <button className="dark:bg-slate-200 dark:rounded-full p-2" onClick={handleReset} title="Reset">
          <GrPowerReset color="#cbd5e1"  className="active:animate-spin"  />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Sort;
