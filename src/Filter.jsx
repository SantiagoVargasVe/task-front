import React from "react";
import "./Filter.css";
const Filter = ({
  handleFilterName,
  handleFilterEpisodes,
  handleFilterOrigin,
  handleFilterGender,
  handleFilterStatus,
  handleFilterSpecies,
  filterName,
  filterEpisodes,
  filterOrigin,
  filterGender,
  filterStatus,
  filterSpecies,
}) => {
  return (
    <div className="filter">
      <input
        className="input"
        type="text"
        placeholder="Name"
        onChange={handleFilterName}
        value={filterName}
      />
      <input
        className="input"
        type="text"
        placeholder="Number of episodes"
        onChange={handleFilterEpisodes}
        value={filterEpisodes}
      />
      <input
        className="input"
        type="text"
        placeholder="Origin"
        onChange={handleFilterOrigin}
        value={filterOrigin}
      />
      <input
        className="input"
        type="text"
        placeholder="Species"
        onChange={handleFilterSpecies}
        value={filterSpecies}
      />
      <input
        className="input"
        type="text"
        placeholder="gender"
        onChange={handleFilterGender}
        value={filterGender}
      />
      <input
        className="input"
        type="text"
        placeholder="Status"
        onChange={handleFilterStatus}
        value={filterStatus}
      />
    </div>
  );
};

export default Filter;
