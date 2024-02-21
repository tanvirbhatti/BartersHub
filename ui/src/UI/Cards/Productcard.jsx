const Productcard = ({product}) => {
  const { image, price, description, location,title } = product;

  return (
      <div className="product-card">
          <div className="image-container">
              <img src={image} alt={description} />
          </div>
          <div className="product-info">
              <h2>{title}</h2>
              <p>{price}</p>
              <span>{location}</span>
          </div>
      </div>
  );
}

export default Productcard;
