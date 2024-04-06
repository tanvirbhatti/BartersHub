import React, { useEffect, useState } from "react";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";
import { toast } from 'react-toastify';
import ConfirmationModal from "../../UI/BootstrapModal/ConfirmationModal"; // Import the new modal component

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/get-products")
            .then(res => res.json())
            .then(data => setProducts(data["list of products"]))
            .catch(err => console.error("error fetching data", err));
    }, []);

    const deleteProduct = (productId, productName)=>{
        const authToken = localStorage.getItem("token");
        setConfirmMessage(`Are you sure you want to DELETE the Product ${productName}`);

        if(!authToken){
            toast.error("Authentication token not found. Please login again")
            return;
        }

        setConfirmAction(() => () => {
            fetch(`http://localhost:8000/admin/delete-product/${productId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                toast.success(data.message)
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
                setModalOpen(false)
            })
            .catch(err=>console.error("error deleteing the product",err));
            setModalOpen(false);
        });
        setModalOpen(true);
    }

    const handleToggleChange = (toggleState, productId, productName) => {
        
        // Handle the toggle state change according to the toggleState
        if (toggleState) {
            // If toggled on, ask for confirmation to add to featured collection
            setConfirmAction(() => () => addToFeatured(productId));
            setConfirmMessage(`Are you sure you want to ADD Product "${productName}" into featured collection ?`)
            setModalOpen(true);
        } else {
            // If toggled off, ask for confirmation to remove from featured collection
            setConfirmAction(() => () => removeFromFeatured(productId));
            setConfirmMessage(`Are you sure you want to REMOVE Product "${productName}" into featured collection ?`)
            setModalOpen(true);
        }
    }

    const addToFeatured = (productId) => {
        fetch("http://localhost:8000/admin/add-featured-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message);
            setModalOpen(false);
        })
        .catch(err => console.error("error adding to featured collection", err));
    }

    const removeFromFeatured = (productId) => {
        fetch("http://localhost:8000/admin/delete-featured-product", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message)
            setModalOpen(false)
        })
        .catch(err => console.error("error removing from featured collection", err));
    }

    return (
        <div>
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmAction}
                message={confirmMessage}
            />
            <table className="w-100 p-3">
                <thead className="bg-dark text-white align-items-center text-center">
                <tr className="row p-2 align-items-center text-center">
                        <th className="col-md-1">Image</th>
                        <th className="col-md-3">Title</th>
                        <th className="col-md-2">Featured Product</th>
                        <th className="col-md-3">User</th>
                        <th className="col-md-1">City</th>
                        <th className="col-md-1">Delete</th>
                        <th className="col-md-1">View</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index) => (
                        <tr className="d-flex py-2 align-items-center text-center border-bottom" key={index}>
                            <td className="col-md-1 p-0">
                                <img src={product.image} alt={product.title} style={{ width: '100%'}} />
                            </td>
                            <td className="col-md-3">{product.title}</td>
                            <td className="col-md-2">
                                <ToggleButton
                                    id={product._id}
                                    initialToggleState={product.featuredProduct}
                                    onToggle={(toggleState) => handleToggleChange(toggleState, product._id, product.title)}
                                />
                            </td>
                            <td className="col-md-3">{product.email}</td>
                            <td className="col-md-1">city</td>
                            <td className="col-md-1">
                                <button className="btn btn-primary" onClick={()=>deleteProduct(product._id, product.title)}>
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
        </div>
    );
};
