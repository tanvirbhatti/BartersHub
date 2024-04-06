import React from "react";
import { Link } from "react-router-dom";
import "../../Assets/Stylesheets/UI/Productcard.css";

const Productcard = ({ product }) => {
  const { image, price, description, location, title, _id } = product;

  return (
    <Link to={`/productdetails/${_id}`} className="product-card text-decoration-none ">
      <div className="image-container">
        <img src={image} alt={description} />
      </div>
      <div className="product-info">
        <h2>{title}</h2>
        <p>${price}</p>
        <span>{location}</span>
      </div>
    </Link>
  );
};

export default Productcard;
