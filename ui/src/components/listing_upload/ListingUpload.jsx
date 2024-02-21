import React, { useState } from 'react';
import './ListingUpload.css';
import axios from "axios";

const ListingUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'category1', // Default category
        price: '',
        phoneNumber: '',
        email: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.title || formData.title.trim() === '') {
            validationErrors.title = 'Product Title is required';
        }
        if (!formData.description || formData.description.trim() === '') {
            validationErrors.description = 'Product Description is required';
        }
        if (!formData.price || formData.price.trim() === '') {
            validationErrors.price = 'Price is required';
        }
        if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
            validationErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/g.test(formData.phoneNumber.trim())) {
            validationErrors.phoneNumber = 'Phone Number must be a valid 10-digit number';
        }
        if (!formData.email || formData.email.trim() === '') {
            validationErrors.email = 'Email is required';
        }
        if (!selectedImage) {
            validationErrors.image = 'Please select an image';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
                const dataToSend = {
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    price: formData.price,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                    image: selectedImage.name // Just send the image name/path here
                };

                const response =await axios.post("http://localhost:8000/add-product", dataToSend);
                alert(response.data.message)
                // Clear the form after successful submission
                setFormData({
                    title: '',
                    description: '',
                    category: 'category1',
                    price: '',
                    phoneNumber: '',
                    email: ''
                });
                setSelectedImage(null);
                setErrors({});
            } 
        
    };

    return (
        <div className="form-container">
            <form className="product-ad-form" onSubmit={handleSubmit}>
                <h2>Post Product Ad</h2>

                <label htmlFor="title">Product Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
                {errors.title && <span className="error">{errors.title}</span>}

                <label htmlFor="description">Product Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
                {errors.description && <span className="error">{errors.description}</span>}

                <label htmlFor="category">Select a Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>

                <div className="image-upload-container">
                    <label>Add photos to attract customers to your ad post</label>
                    <hr />
                    <br />
                    <input type="file" accept="image/*" onChange={handleImageSelect} />
                    {errors.image && <span className="error">{errors.image}</span>}
                </div>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />
                {errors.price && <span className="error">{errors.price}</span>}

                <fieldset className="contact-information">
                    <legend>Contact Information</legend>
                    <hr />
                    <div className='contact-info-input'>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>

                    <div className='contact-info-input'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                </fieldset>
                <button type="submit" className="submit-btn">Add Product</button>
            </form>
        </div>
    );
}

export default ListingUpload;
