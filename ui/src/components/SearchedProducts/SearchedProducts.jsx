import { useState, useEffect } from 'react';
import Productcard from "../../UI/Cards/Productcard.jsx";
import "../../Assets/Stylesheets/Components/Productlisting.css"
import { Link, useLocation } from 'react-router-dom';
import { useSearchContext } from '../../contexts/SearchContext.jsx';

const SearchedProducts = () => {
    const [products, setProducts] = useState([]);
    const {searchResults} = useSearchContext()
    const path = useLocation().pathname.split('/');
    const searchTerm = path[path.length - 1];
    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_SERVER}/get-products`)
            .then(response => response.json())
            .then(data => {
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
                <section className="products d-flex row">
                    {
                        (
                            searchResults.length > 0 ? 
                            searchResults.map(product => (
                                    <Productcard className="col-3" key={product._id} product={product}/>
                                )
                            ) 
                            : 
                            (
                                <>
                                    {products.map(product =>(
                                        <Productcard product={product} key={product._id}/>
                                    ))}
                                </>
                            )
                        ) 
                    }
                </section>
            </div>
        </div>
    );
}

export default SearchedProducts;
