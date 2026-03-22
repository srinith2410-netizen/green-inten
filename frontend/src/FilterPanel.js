import React from "react";

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleFilterChange = (cause) => {
    const newFilters = { ...filters };
    newFilters[cause] = !newFilters[cause];
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-panel">
      <h3>Filter by Emission Source</h3>
      <div className="filter-options">
        <label>
          <input
            type="checkbox"
            checked={filters.traffic}
            onChange={() => handleFilterChange("traffic")}
          />
          Traffic
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.industrial}
            onChange={() => handleFilterChange("industrial")}
          />
          Industrial
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.residential}
            onChange={() => handleFilterChange("residential")}
          />
          Residential
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;