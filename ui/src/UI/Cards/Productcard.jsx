import './Productcard.css';

const Productcard = ({product}) => {
    const { imageUrl, price, description, location } = product;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={description} />
      <div className="product-info">
        <h2>{price}</h2>
        <p>{description}</p>
        <span>{location}</span>
      </div>
    </div>
  );
}

export default Productcard