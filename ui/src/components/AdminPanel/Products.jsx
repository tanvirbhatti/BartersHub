import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";
import { toast } from 'react-toastify';

export const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/get-products")
            .then(res => res.json())
            .then(data => setProducts(data["list of products"]))
            .catch(err => console.error("error fetching data", err));
    }, []);

    const deleteProduct = (productId)=>{
        const authToken = localStorage.getItem("token");

        if(!authToken){
            toast.error("Authentication token not found. Please login again")
            return;
        }

        if(window.confirm("are you sure you want to delete this product?")){
            fetch(`http://localhost:8000/delete-product/${productId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                toast.success(data.message)
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            })
            .catch(err=>console.error("error deleteing the product",err));
        }
    }

    const handleToggleChange = (toggleState, productId) => {
        // Update the products state with the new toggle state for the corresponding product
        setProducts(prevProducts => prevProducts.map(product => {
            if (product._id === productId) {
                return { ...product, featuredProduct: toggleState };
            }
            return product;
        }));
        
        // Handle the toggle state change according to the toggleState
        if (toggleState) {
            // If toggled on, ask for confirmation to add to featured collection
            if (window.confirm("Are you sure you want to add it to the featured collection?")) {
                addToFeatured(productId);
            }
        } else {
            // If toggled off, ask for confirmation to remove from featured collection
            if (window.confirm("Are you sure you want to remove it from the featured collection?")) {
                removeFromFeatured(productId);
            }
        }
    }

    const addToFeatured = (productId) => {
        fetch("http://localhost:8000/add-featured-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        })
        .then(res => res.json())
        .then(data => toast.success(data.message))
        .catch(err => console.error("error adding to featured collection", err));
    }

    const removeFromFeatured = (productId) => {
        fetch("http://localhost:8000/delete-featured-product", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        })
        .then(res => res.json())
        .then(data => toast.success(data.message))
        .catch(err => console.error("error removing from featured collection", err));
    }

    return (
        <table className="w-100 p-3">
            <thead className="bg-dark text-white align-items-center text-center">
                <tr className="row p-2 align-items-center text-center">
                    <th className="col-md-1">Image</th>
                    <th className="col-md-2">Title</th>
                    <th className="col-md-3">Featured Product</th>
                    <th className="col-md-3">User</th>
                    <th className="col-md-1">City</th>
                    <th className="col-md-1">Delete</th>
                    <th className="col-md-1">View</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((product, index) => (
                    <tr className="row p-2 align-items-center text-center border-bottom" key={index}>
                        <td className="col-md-1 p-0">
                            <img src={product.image} alt={product.title} style={{ width: '100%', height: '70px' }} />
                        </td>
                        <td className="col-md-2">{product.title}</td>
                        <td className="col-md-3 justify-content-center d-flex">Featured Product
                            <ToggleButton
                                initialToggleState={product.featuredProduct}
                                onToggle={(toggleState) => handleToggleChange(toggleState, product._id)}
                            />
                        </td>
                        <td className="col-md-3">{product.email}</td>
                        <td className="col-md-1">city</td>
                        <td className="col-md-1">
                            <button className="btn btn-primary" onClick={()=>deleteProduct(product._id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </td>
                        <td className="col-md-1">
                            <a>
                                <i className="fa-solid fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
