import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import '../../Assets/Stylesheets/Components/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { toast } from "react-toastify";
import User from '../../Assets/Images/User.png'
import ConfirmationModal from "../../UI/BootstrapModal/ConfirmationModal";
import logout from '../../utills/logoutUtil'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentListing, setCurrentListing] = useState(null);
    const [updatedListing, setUpdatedListing] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        price: '',
        phoneNumber: '',
        email: '',
        category: ''
    });

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
        setConfirmMessage("Are you sure you want to logout?");
        setConfirmAction(() => () => {
            logout(user,setUser,setModalOpen, toast, navigate)
        });
        setModalOpen(true);
      };
        
    
    const handleDelete = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to delete listings.');
            return;
        }


        try {
            const response = await fetch(`http://localhost:8000/delete-product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                toast.success('Listing deleted successfully.');
                fetchListings(token); // Refresh listings after deletion
            } else {
                toast.error('Failed to delete listing.');
            }
        } catch (error) {
            console.error("Error during delete:", error);
        }

    };

    const handleShowModal = (listing) => {
        setCurrentListing(listing);
        setUpdatedListing(listing);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const validateFields = () => {
        let isValid = true;
        let newErrors = {};

        // Title validation
        if (!updatedListing.title) {
            isValid = false;
            newErrors.title = 'Title is required.';
        }

        // Description validation
        if (!updatedListing.description) {
            isValid = false;
            newErrors.description = 'Description is required.';
        }

        // Price validation
        if (!updatedListing.price || isNaN(updatedListing.price) || Number(updatedListing.price) <= 0) {
            isValid = false;
            newErrors.price = 'Price must be a positive number.';
        }

        // Phone number validation (10 digits check)
        if (!updatedListing.phoneNumber || updatedListing.phoneNumber.length !== 10 || !/^\d{10}$/.test(updatedListing.phoneNumber)) {
            isValid = false;
            newErrors.phoneNumber = 'Phone number must be 10 digits.';
        }

        // Email validation (simple format check)
        if (!updatedListing.email || !/\S+@\S+\.\S+/.test(updatedListing.email)) {
            isValid = false;
            newErrors.email = 'Email is invalid.';
        }

        // Category validation
        if (!updatedListing.category) {
            isValid = false;
            newErrors.category = 'Category is required.';
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleUpdateListing = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to update listings.');
            return;
        }
        if (!validateFields()) {
            toast.error('Please correct the errors before submitting.');
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(updatedListing).forEach(key => {
                formData.append(key, updatedListing[key]);
            });
            // console.log(updatedListing)
            const response = await axios.post('http://localhost:8000/edit-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)
            if (response.data.message) {
                toast.success('Listing updated successfully.');
                setShowModal(false);
                fetchListings(token); // Refresh the listings
            } else {
                toast.error('Failed to update listing.');
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
        <>
        <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={confirmAction}
            message={confirmMessage}
        />
        <div className="container pt-5 pb-5">
            <div className="d-flex">
                <div className="rounded shadow CardMargin" style={{ width: "20%" }}>
                    <div className=" text-center">
                        {user && (
                            <>
                                <img className="avatar img-fluid border rounded mb-3 mt-4" src={User} alt="User Avatar" />
                                <div className='pb-3 h-100 w-100'>
                                    <h5>{user.firstName} {user.lastName} </h5>
                                    <p>{user.email}</p>
                                    <p className="location">Edit Profile</p>
                                    <a onClick={handleLogout}>
                                        <button className="rounded-2 Btn active" >Logout</button>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="shadow rounded" style={{ width: "85%" }}>
                    <h3 className="row py-3 pb-2 px-5 fw-bold">Listings</h3>
                    <div className="row px-5 pb-2 gap-4">
                        {listings.map((product, index) => (
                            <div className="card border mb-3 px-0" key={product.id} style={{ width: "300px" }}>
                                <img src={product.image} alt={product.title} className="card-img-top product-img" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">${product.price}</p>
                                    <div className="d-flex justify-content-between ">
                                        <button className='btn btn-secondary btn-sm' onClick={() => handleShowModal(product)}>Update</button>

                                        <a onClick={() => handleDelete(product._id)}>
                                            <i class="fa-solid fa-trash"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                onChange={handleFormChange}
                            />
                            {errors.title && <div className="text-danger">{errors.title}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                defaultValue={currentListing?.description}
                                onChange={handleFormChange}
                            />
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                defaultValue={currentListing?.price}
                                onChange={handleFormChange}
                            />
                            {errors.price && <div className="text-danger">{errors.price}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phoneNumber"
                                defaultValue={currentListing?.phoneNumber}
                                onChange={handleFormChange}
                                />
                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={currentListing?.email}
                                onChange={handleFormChange}
                                />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                defaultValue={currentListing?.category}
                                onChange={handleFormChange}
                            >
                                {/* Options should be predefined or fetched */}
                                <option value="">Select a category</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                            </Form.Select>
                            {errors.category && <div className="text-danger">{errors.category}</div>}
                        </Form.Group>

                    </Form>

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
    </>
    );
};

export default UserProfile;
