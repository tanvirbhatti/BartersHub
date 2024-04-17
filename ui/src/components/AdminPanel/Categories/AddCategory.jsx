import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
export const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleAddCategory = () => {
        const authToken = localStorage.getItem("token");

        if(!authToken){
            toast.error("Authentication token not found. Please login again")
            return;
        }
        else{
            if (categoryName.trim() === "") {
                setValidationMessage("Category name cannot be empty.");
            } else {
                axios.post(`${process.env.REACT_APP_API_SERVER}/admin/add-category`,{
                    categoryName
                },
                {
                    headers: {
                        "Authorization":`Bearer ${authToken}`
                    },
                })
                .then(data=>{
                    toast.success(data.data.message)
                }
                )
                .catch(err => 
                    console.error("error adding to data collection", err));
    
                setCategoryName(""); 
                setValidationMessage("");
            }
        }
    };

    return (
        <>
            <div className="p-5 d-flex gap-3 justify-content-center align-items-center">
                <label htmlFor="category">Category Name :</label>
                <div className="col-md-7">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleInputChange}
                        id="category_Name"
                        className="form-control"
                        placeholder="Category name must be unique"
                    />
                </div>
                <input
                    type="button"
                    value="Add"
                    onClick={handleAddCategory}
                    className="bg-orange btn text-white border-0"
                />
            </div>
            {validationMessage && (
                <div className="text-danger text-center">{validationMessage}</div>
            )}
        </>
    );
};
