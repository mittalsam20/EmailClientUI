import React from "react";

import "./FilterHeader.css";
import Chip from "UIComponents/Chip/Chip";

const getFilterOptions = ({
  type,
  options,
  filterId,
  handleChange,
  selectedFilters,
}) => {
  return options.map(({ id, value, optionLabel }) => {
    return type === "chip" ? (
      <div key={id} onClick={() => handleChange({ filterId, value })}>
        {value === selectedFilters[filterId] ? (
          <Chip>{optionLabel}</Chip>
        ) : (
          optionLabel
        )}
      </div>
    ) : (
      //More types of filter can come here more cleaner way is to use switch
      <></>
    );
  });
};

const Filters = (props) => {
  const { filtersToShow, selectedFilters, handleChange } = props;
  return filtersToShow.map(({ id: filterId, label, type, options }) => {
    const filterOptions = getFilterOptions({
      type,
      options,
      filterId,
      handleChange,
      selectedFilters,
    });
    //In the current UI there was no use of Filters label so hence omitted, only rendering filterOptions
    //otherwise this component can render n types of filters from search, dropdown, checkListDropdown, etc.
    return (
      <div key={filterId} className="optionsContainer">
        {filterOptions}
      </div>
    );
  });
};

//This is a generic FilterHeader Component
//even more filters can be added in future just by passing filtersToShow
const FilterHeader = (props) => {
  const { filtersToShow, selectedFilters, onchange } = props;

  const handleChange = ({ filterId, value }) => {
    if (selectedFilters[filterId] === value) {
      onchange({ name: filterId, value: null });
      return;
    }
    onchange({ name: filterId, value });
  };

  return (
    <div className="filterHeaderContainer">
      {"Filter By:"}
      <div className="filtersContainer">
        <Filters
          handleChange={handleChange}
          filtersToShow={filtersToShow}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
};

export default FilterHeader;
