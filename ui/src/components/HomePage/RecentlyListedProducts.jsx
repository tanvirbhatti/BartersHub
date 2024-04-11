import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { limitProductDescription } from "./FeaturedProducts";
import GradientButton from '../../UI/GradientButton/GradientButton'

export default function RecentlyListedProducts(){

    const [recentlyListedProducts, setRecentlyListedProducts] = useState([])

    useEffect(() => {
        // Fetch data from the API
        fetch(`${process.env.REACT_APP_API_SERVER}/get-recently-products`)
            .then(response => response.json())
            .then(data => {
                setRecentlyListedProducts(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    

    return(
        <div className="product-list-container p-5 pt-0">
        <h3><b>Recently Listed:</b></h3>
        <div className='row'>
            {recentlyListedProducts &&(recentlyListedProducts.length <= 3) && recentlyListedProducts.map((product, index) => {
                    const truncatedDescription = limitProductDescription(product.description)
                    return (
                        <div key={index} className="product-card border-0 shadow-none w-25">
                            <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{truncatedDescription}</p>
                                <p className="card-text">{product.price}</p>
                                <div className="col-md-8">
                                    <a href={`/productDetails/${product._id}`}>
                                        <GradientButton text="View Product" rounded={true} />
                                    </a>
                                </div>                         
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <Slider
            slidesToShow={4}
            slidesToScroll={1}
            infinite={false}
        >            
            {recentlyListedProducts && (recentlyListedProducts.length > 3) && recentlyListedProducts.map((product, index) => {
                    const truncatedDescription = limitProductDescription(product.description)
                    return (
                        <div key={index} className="product-card border-0 shadow-none">
                            <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{truncatedDescription}</p>
                                <p className="card-text">{product.price}</p>
                                <div className="col-md-8">
                                    <a href={`/productDetails/${product._id}`}>
                                        <GradientButton text="View Product" rounded={true} />
                                    </a>
                                </div>  
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
    </div>

    )
}