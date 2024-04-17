import React, { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import "../../Assets/Stylesheets/Components/ProductDetails.css"
import GradientButton from "../../UI/GradientButton/GradientButton.jsx";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_SERVER}/get-product/${id}`);
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

    const handleSellerContact = () =>{

        navigate(`/chat/${product._id}`)

    }

    return (
        <div className="container mt-5 mb-5">
            {product ? (
                <div>
                     <div className="row">
                    <div className="col-md-6  image-div">
                        <img className="product_img" alt="Product" src={product.image} />
                    </div>
                    <div className="col-md-6">
                        <div className="product-dtl">
                            <div className="product-info p-0 pt-2">
                                <div className="product-name">{product.title}</div>
                                
                                <div className="fw-bold product-price-discount"><span>${product.price}</span></div>
                            </div>
                            <p>{product.description}</p>
                            
                            <div className="contact_button">
                                <GradientButton rounded={true} text="Contact seller" onClick={handleSellerContact}/>
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
