import React from "react";
import "./Card.css";
const HeroCard = ({
  name,
  status,
  gender,
  species,
  origin,
  image,
  episode,
}) => {
  status = status.toLowerCase();
  return (
    <div className="card animate__bounceIn">
      <img className="image" src={image} alt={name} />
      <div className="info">
        <div className="name-status">
          <h3 className="name">{name}</h3>
          <div className={"dot dot-" + status}></div>
        </div>
        <p className="gender-species">
          {gender} - {species}{" "}
        </p>
        <p className="orange-label">From</p>
        <p className="origin">{origin.name}</p>
        <p className="orange-label">Episodes</p>
        <p className="origin">{episode.length}</p>
      </div>
    </div>
  );
};

export default HeroCard;
