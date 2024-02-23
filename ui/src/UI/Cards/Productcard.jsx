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
      <div className='col-md-6'>
        <button className='btn  view_button'>View Product</button>
      </div>
    </div>
  );
}

export default Productcard