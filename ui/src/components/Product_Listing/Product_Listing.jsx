import { useState, useEffect } from 'react';
import Productcard from "../../UI/Cards/Productcard.jsx";
import "./Product_listing.css"
import { Link } from 'react-router-dom';

const Product_Listing = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:8000/get-products")
            .then(response => response.json())
            .then(data => {
                // Assuming your response data structure is { "list of products": [...] }
                setProducts(data["list of products"]);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="marketplace">
            <header className="Posting_section">
                <div className="Posting_section_div">
                    <h1>List your product and get it sold Today! with Barters Hub</h1>
                    <p>Your one-stop marketplace for seamless transactions</p>
                    <button type="button" className="upload-btn">
                        <Link to="/ListingsUpload" className="Listinglink">Post Your Listing here</Link>
                    </button>
                </div>
            </header>

            <div className="container">
                <section className="marketplace-header">
                    <button className="menu-button">Filters</button>
                    <select className="location-filter">
                        <option value="kitchener">Kitchener</option>
                    </select>
                </section>

                <section className="products">
                    {products.map(product => (
                        <Productcard key={product._id} product={product} />
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Product_Listing;
