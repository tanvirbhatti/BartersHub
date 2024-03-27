import React, { useEffect, useState } from 'react'
import "./Product_Home.css"
import Testimonials from './Testimonials';
import Hero from "./heroImage.png";


const ProductHome = () => {
    const [products, setProducts] = useState([])
    const [recentlyListedProducts, setRecentlyListedProducts] = useState([])

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:8000/get-featured-products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        fetch("http://localhost:8000/get-recently-products")
            .then(response => response.json())
            .then(data => {
                setRecentlyListedProducts(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <div className="row p-5 align-items-center no_gutter">
                <div className="col-md-7">
                    <h4 className='text-dark'><b>Empower your exchanges, cultivate connections, thrive with Barters Hub today!</b></h4>
                    <div className='pt-3'>
                        <a href="/productListings" className="btn view_button btn-outline-dark">Add Your Product</a>
                    </div>
                </div>
                <div className="col-md-5 text-center">
                    <img src={Hero} className="img-fluid w-100" alt="" />
                </div>
            </div>

            <div className="row p-5 pt-0 align-items-center no_gutter">
                <h3><b>Categories: </b></h3>
                <div>
                    <button type="button" className="btn btn-secondary mr-10px">
                        All Categories
                    </button>

                    <button type="button" className="btn btn-secondary mr-10px">
                        Electronics
                    </button>

                    <button type="button" className="btn btn-secondary mr-10px">
                        Furniture
                    </button>
                    <button type="button" className="btn btn-secondary mr-10px">
                        Fashion
                    </button>
                    <button type="button" className="btn btn-secondary mr-10px">
                        Toys & Games
                    </button>
                    <button type="button" className="btn btn-secondary mr-10px">
                        Property Rentals
                    </button>

                    <button type="button" className="btn btn-secondary mr-10px mt-30px ">
                        Home
                    </button>
                    <button type="button" className="btn btn-secondary mr-10px mt-30px ">
                        Pet Supplies
                    </button>
                    <button type="button" className="btn btn-secondary mr-10px mt-30px ">
                        Others
                    </button>

                </div>
            </div>

            <div>
                <div className="product-list-container p-5 pt-0">
                    <h3><b>Featured Product: </b></h3>
                    <div className="scrolling-wrapper">
                        {products.featuredProducts && products.featuredProducts.map((product, index) => {
                            // Limiting description to 100 words
                            const limitedDescription = product.product.description.split(' ').slice(0, 100).join(' ');
                            // Adding "..." if description exceeds 100 words
                            const truncatedDescription = product.product.description.length > 100 ? limitedDescription + "..." : limitedDescription;

                            return (
                                <div key={index} className="product-card border-0 shadow-none">
                                    <img src={product.product.image} alt={product.product.title} style={{ width: '100%', height: '200px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.product.title}</h5>
                                        <p className="card-text">{truncatedDescription}</p>
                                        <p className="card-text">{product.product.price}</p>
                                        <button className='btn btn-sm view_button'>View Product</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="product-list-container p-5 pt-0">
                    <h3><b>Recently Listed:</b></h3>
                    <div className="scrolling-wrapper">
                        {recentlyListedProducts && recentlyListedProducts.map((product, index) => {
                            // Limiting description to 100 words
                            const limitedDescription = product.description.split(' ').slice(0, 10).join(' ');
                            // Adding "..." if description exceeds 100 words
                            const truncatedDescription = product.description.length > 100 ? limitedDescription + "..." : limitedDescription;

                            return (
                                <div key={index} className="product-card border-0 shadow-none">
                                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{truncatedDescription}</p>
                                        <p className="card-text">{product.price}</p>
                                        <button className='btn btn-sm view_button'>View Product</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div className="product-list-container pt-0">
                    <h3 className='p-5 pt-0 pb-0'><b>Testimonials:</b></h3>
                    {
                        <Testimonials />
                    }
                </div>

            </div>
        </>
    )
}

export default ProductHome
