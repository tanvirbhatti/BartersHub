import React, { useState } from 'react';
import './ListingUpload.css';

const ListingUpload = () => {
    const [formData, setFormData] = useState({
        productTitle: '',
        productDescription: '',
        productCategory: 'category1', // Default category
        productPrice: '',
        phoneNumber: '',
        email: ''
    });

    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 images
        const selectedImagePreviews = files.map(file => URL.createObjectURL(file));
        setSelectedImages(selectedImagePreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
    
        if (!formData.productTitle || formData.productTitle.trim() === '') {
            validationErrors.productTitle = 'Product Title is required';
        }
        if (!formData.productDescription || formData.productDescription.trim() === '') {
            validationErrors.productDescription = 'Product Description is required';
        }
        if (!formData.productPrice || formData.productPrice.trim() === '') {
            validationErrors.productPrice = 'Price is required';
        }
        if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
            validationErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/g.test(formData.phoneNumber.trim())) {
            validationErrors.phoneNumber = 'Phone Number must be a valid 10-digit number';
        }
        if (!formData.email || formData.email.trim() === '') {
            validationErrors.email = 'Email is required';
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            submitForm();
            // Clear the form after successful submission
            setFormData({
                productTitle: '',
                productDescription: '',
                productCategory: 'category1',
                productPrice: '',
                phoneNumber: '',
                email: ''
            });
            setSelectedImages([]);
            setErrors({});
        }
    };
    
    const submitForm = () => {
        const dataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            dataToSend.append(key, value);
        });
        selectedImages.forEach((image, index) => {
            dataToSend.append(`image${index + 1}`, image);
        });

        alert("Listing added! ")

        // Send data to API here
        fetch('', {
            method: 'POST',
            body: dataToSend
        })
        .then(response => {
        })
        .catch(error => {
        });
    };

    return (
        <div className="form-container">
            <form className="product-ad-form" onSubmit={handleSubmit}>
                <h2>Post Product Ad</h2>

                <label htmlFor="productTitle">Product Title</label>
                <input type="text" id="productTitle" name="productTitle" value={formData.productTitle} onChange={handleInputChange} />
                {errors.productTitle && <span className="error">{errors.productTitle}</span>}

                <label htmlFor="productDescription">Product Description</label>
                <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleInputChange}></textarea>
                {errors.productDescription && <span className="error">{errors.productDescription}</span>}

                <label htmlFor="productCategory">Select a Category</label>
                <select id="productCategory" name="productCategory" value={formData.productCategory} onChange={handleInputChange}>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>

                <div className="image-upload-container">
                    <label>Add photos to attract customers to your ad post</label>
                    <hr />
                    <br />
                    <div className="images-preview">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="image-upload-box">
                                <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageSelect} multiple />
                </div>

                <label htmlFor="productPrice">Price</label>
                <input type="number" id="productPrice" name="productPrice" value={formData.productPrice} onChange={handleInputChange} />
                {errors.productPrice && <span className="error">{errors.productPrice}</span>}

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
