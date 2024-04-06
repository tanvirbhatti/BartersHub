import React, { useState, useEffect } from 'react';
import '../../Assets/Stylesheets/Components/ListingUpload.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const ListingUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'category1', 
        price: '',
        phoneNumber: '',
        email: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // New state for image preview
    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);

    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Login required for uploading listings");
            navigate('/login'); // Redirect to login
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Remove error when input is corrected
        if (errors[name]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[name];
            setErrors(updatedErrors);
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            // Remove image error if previously added
            if (errors.image) {
                const updatedErrors = { ...errors };
                delete updatedErrors.image;
                setErrors(updatedErrors);
            }
        } else {
            setErrors({ ...errors, image: 'Please upload a valid JPG or PNG image.' });
        }
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
        if (formData.price < 0) {
            validationErrors.price = 'Price cannot be negative.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Create a FormData object
            const formDataToSend = new FormData();
            // Append form fields to the FormData object
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('phoneNumber', formData.phoneNumber);
            formDataToSend.append('email', formData.email);
            // Check if image is selected and append it to the FormData object
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }
            setIsUploading(true);
            try {
                const token = localStorage.getItem('token');

                // Add an Authorization header with the token to your axios request
                const response = await axios.post("http://localhost:8000/add-product", formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}` 
                    }
                });
                toast.success(response.data.message);
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
            } catch (error) {
                console.error('Error submitting the form', error);
            } finally {
                setIsUploading(false);
                setSelectedImage(null);
                setImagePreview(null);
            }

        }
    };


    return (
        <div className="form-container">
            {isUploading && (
                <div className="uploading-indicator">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Uploading...</span>
                    </div>
                </div>
            )}

            <form className="product-ad-form" onSubmit={handleSubmit}>
                <h2>Post Product Ad</h2>

                <label htmlFor="title">Product Title</label>
                <input className="input_text" type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />

                {errors.title && <div className="error-message">{errors.title}</div>}

                <label htmlFor="description">Product Description</label>
                <textarea className="input_text" id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
                {errors.description && <div className="error-message">{errors.description}</div>}

                <label htmlFor="category">Select a Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>

                <div className="image-upload-container">
                    <label>Add photos of your product <span className="required-indicator">*</span></label>
                    <hr />
                    <br />
                    <input type="file" accept="image/jpeg, image/png" onChange={handleImageSelect} />
                    {errors.image && <div className="error-message" style={{marginTop:"10px"}}>{errors.image}</div>}
                    
                    {imagePreview && (
                        <div className="image-preview-container">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>


                <label htmlFor="price">Price</label>
                <input className="input_text" type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />
                {errors.price && <span className="error">{errors.price}</span>}

                <fieldset className="contact-information">
                    <p>Contact Information</p>
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
                <button type="submit" className="submit-btn" disabled={Object.keys(errors).length > 0 || isUploading}>Add Product</button>
            </form>
        </div>
    );
}

export default ListingUpload;
