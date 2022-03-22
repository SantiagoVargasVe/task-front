import React from "react";
import "./Filter.css";
const Filter = ({ handleFilter }) => {
  return (
    <div className="filter">
      <input
        className="input"
        type="text"
        placeholder="Name"
        onChange={(e) => {
          handleFilter(["name", e.target.value]);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Number of episodes"
        onChange={(e) => {
          handleFilter(["episodes", e.target.value]);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Origin"
        onChange={(e) => {
          handleFilter(["origin", e.target.value]);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Species"
        onChange={(e) => {
          handleFilter(["species", e.target.value]);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="gender"
        onChange={(e) => {
          handleFilter(["gender", e.target.value]);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Status"
        onChange={(e) => {
          handleFilter(["status", e.target.value]);
        }}
      />
    </div>
  );
};

export default Filter;
