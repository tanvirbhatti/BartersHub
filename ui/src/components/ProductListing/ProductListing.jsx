import { useState, useEffect } from 'react';
import Productcard from "../../UI/Cards/Productcard.jsx";
import "../../Assets/Stylesheets/Components/Productlisting.css"
import { Link } from 'react-router-dom';

const ProductListing = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        
        fetch(`${process.env.REACT_APP_API_SERVER}/get-products`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // Assuming your response data structure is { "list of products": [...] }
                setProducts(data["list of products"]);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="marketplace">
            <header className='d-flex w-100 my-4 justify-content-center align-content-center gap-4 text-white py-3'>
                <h4 className='d-flex align-items-center mb-0'>List your product and get it sold Today!</h4>
                <button type="button" className="upload-btn">
                    <Link to="/ListingsUpload" className="Listinglink">Post Your Ad</Link>
                </button>
            </header>

            <div className="container">
                <section className="marketplace-header">
                    <button className="menu-button rounded">Filters</button>
                    <select className="location-filter rounded">
                        <option value="kitchener">Kitchener</option>
                    </select>
                </section>

                <section className="products d-flex row">
                    {products.map(product => (
                        <Productcard className="col-3" key={product._id} product={product} />
                    ))}
                </section>
            </div>
        </div>
    );
}

export default ProductListing;
