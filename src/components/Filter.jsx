import React, { useState } from "react";

const Filter = () => {
  const [filteredRange, setFilteredRange] = useState(25);
  return (
    <div className="text-lg flex flex-col gap-3 ">
      <h3 className="font-semibold dark:text-darktext">Filter by Price</h3>
      <input
        type="range"
        className="w-[200px]"
        min={5}
        max={1000}
        value={filteredRange}
        step={5}
        onChange={(e) => setFilteredRange(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <button className="bg-primary text-white text-base p-2">FILTER</button>
        <p className="text-base dark:text-darktext">
          <span className="text-gray-600 dark:text-gray-200">Price:</span> Rs.
          {filteredRange}
        </p>
      </div>
    </div>
  );
};

export default Filter;
