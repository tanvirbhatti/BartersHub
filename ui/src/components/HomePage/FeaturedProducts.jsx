import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GradientButton from '../../UI/GradientButton/GradientButton'

export const limitProductDescription = (productDescription)=>{
    const descriptionLength = 100;
    if (productDescription.length > descriptionLength) {
        return productDescription.substring(0, descriptionLength) + "...";
    } else {
        return productDescription;
    }
}

export default function FeaturedProducts(){

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8000/get-featured-products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    },[])
    

    return(
        <div className="product-list-container p-5 pt-0">
                <h3><b>Featured Products: </b></h3>
                <div className='row'>
                    {(products.featuredProducts)&&(products.featuredProducts.length <= 3) && products.featuredProducts.map((product, index) => {
                            const truncatedDescription = limitProductDescription(product.product.description)
                            return (
                                <div key={index} className="product-card border-0 shadow-none w-25">
                                    <img src={product.product.image} alt={product.product.title} style={{ width: '100%', height: '200px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.product.title}</h5>
                                        <p className="card-text">{truncatedDescription}</p>
                                        <p className="card-text">{product.product.price}</p>
                                        <div className="col-md-8">
                                            <GradientButton text="View Product" rounded={true} />
                                        </div>
                                    </div>
                                </div>
                            )
                    })}
                </div>
                {(products.featuredProducts) && (products.featuredProducts.length > 3) &&
                    (
                        <Slider
                            slidesToShow={4}
                            slidesToScroll={1}
                        >
                            {products.featuredProducts && products.featuredProducts.map((product, index) => {
                                const truncatedDescription = limitProductDescription(product.product.description)
                                return (
                                    <div key={index} className="product-card border-0 shadow-none">
                                        <img src={product.product.image} alt={product.product.title} style={{ width: '100%', height: '200px' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.product.title}</h5>
                                            <p className="card-text">{truncatedDescription}</p>
                                            <p className="card-text">{product.product.price}</p>
                                            <div className="col-md-8">
                                                <GradientButton text="View Product" rounded={true} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    )
                }
            </div>
    )
}