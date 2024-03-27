import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"
import GradientButton from "../../UI/GradientButton/GradientButton.jsx";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get-product/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="container mt-5 mb-5">
            {product ? (
                <div>
                     <div class="row">
                    <div class="col-md-6  image-div">
                        <img className="product_img" alt="Product image" src={product.image} />
                    </div>
                    <div class="col-md-6">
                        <div class="product-dtl">
                            <div class="product-info p-0 pt-2">
                                <div class="product-name">{product.title}</div>
                                
                                <div class="product-price-discount"><span>${product.price}</span></div>
                            </div>
                            <p>{product.description}</p>
                            
                            <div class="contact_button">
                                <GradientButton rounded={false} text="Contact seller"/>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
};

export default ProductDetails;
