import React from "react";

interface FilterButtonProps {
  onClick: (filter: "all" | "active" | "completed") => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <div className="text-center mt-4">
      <button
        onClick={() => onClick("all")}
        className="filter-button mx-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        All
      </button>
      <button
        onClick={() => onClick("active")}
        className="filter-button mx-1 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Active
      </button>
      <button
        onClick={() => onClick("completed")}
        className="filter-button mx-1 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButton;