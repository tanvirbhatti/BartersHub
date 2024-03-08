import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import './UserProfile.css';
import GradientButton from '../../UI/GradientButton/GradientButton';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentListing, setCurrentListing] = useState(null);
    const [updatedListing, setUpdatedListing] = useState({});


    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token and set user data
            const decoded = jwtDecode(token);
            setUser({
                ...decoded,
                token // Store the token if needed for further requests
            });

            // Fetch user listings from the server
            fetchListings(token);
        }
    }, []);

    const fetchListings = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/user-listings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setListings(data.listings); // Assuming the response has a listings field
            } else {
                console.error('Failed to fetch listings');
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (response.ok) {
                setUser(null);
                localStorage.removeItem('token');
                alert("Logout successful");
                window.location.href = '/'; // Redirect to home page
            } else {
                alert('Logout failed!');
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to delete listings.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                const response = await fetch(`http://localhost:8000/delete-product/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    alert('Listing deleted successfully.');
                    fetchListings(token); // Refresh listings after deletion
                } else {
                    alert('Failed to delete listing.');
                }
            } catch (error) {
                console.error("Error during delete:", error);
            }
        }
    };

    const handleShowModal = (listing) => {
        setCurrentListing(listing);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateListing = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to update listings.');
            return;
        }

        try {
            // updatedListing._id = currentListing._id
            // updatedListing.userId = currentListing.userId
            const formData = new FormData();
            formData.append('title', updatedListing.title);
            formData.append('description', updatedListing.description);
            formData.append('price', updatedListing.price);
            formData.append('phoneNumber', updatedListing.phoneNumber);
            formData.append('email', updatedListing.email);
            formData.append('category', updatedListing.category);
            formData.append('_id', currentListing._id);
            formData.append('userId', currentListing.userId);
            // console.log(updatedListing)
            const response = await axios.post('http://localhost:8000/edit-product',formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Listing updated successfully.');
                setShowModal(false);
                fetchListings(token); // Refresh the listings
            } else {
                alert('Failed to update listing.');
            }
        } catch (error) {
            console.error("Error during update:", error);
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setUpdatedListing({ ...updatedListing, [name]: value });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    <div className="">
                        <div className=" text-center">
                            {user && (
                                <>
                                    <img className="avatar img-fluid rounded-circle mb-3" src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=1024x1024&w=is&k=20&c=K2vyMGGU4E4iSfkfTwOGNgG-x-WBadv2anHPFvONnOc=" alt="User Avatar" />
                                    <div className='border h-100 w-100'>
                                        <h5>{user.firstName} {user.lastName} </h5>
                                        <p>{user.email}</p>
                                        <p className="location">{user.city} {user.province} {user.areaCode}</p>
                                        {/* <p className="location">Edit Profile</p>

                                        <p className="user-rating">User Rating: {user.rating}</p> */}

                                        <a onClick={handleLogout}>
                                            <GradientButton rounded={false} text="Logout" />
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-9">
                    <div className=" p-4">
                        <h3 className="mb-4"><b>Listings</b></h3>
                        <div className="row">
                            {listings.map((product, index) => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <div className="card">
                                        <img src={product.image} alt={product.title} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">${product.price}</p>
                                            <div className="d-flex justify-content-between ">
                                                {/* <button className='btn btn-sm btn-primary view_button' onClick={() => handleShowModal(product)}>Update listing</button> */}

                                                <a onClick={() => handleDelete(product._id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                defaultValue={currentListing?.title}
                                onChange={handleFormChange} // Set the onChange handler
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                defaultValue={currentListing?.description}
                                onChange={handleFormChange} // Set the onChange handler
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                defaultValue={currentListing?.price}
                                onChange={handleFormChange} // Set the onChange handler
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phoneNumber"
                                defaultValue={currentListing?.phoneNumber}
                                onChange={handleFormChange} // Set the onChange handler
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={currentListing?.email}
                                onChange={handleFormChange} // Set the onChange handler
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                defaultValue={currentListing?.category}
                                onChange={handleFormChange} // Set the onChange handler
                            >
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                {/* More options as needed */}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    ß
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateListing}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserProfile;
