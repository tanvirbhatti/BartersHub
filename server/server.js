import express from 'express';
import bodyParser from 'body-parser';
import registerUser from './Controllers/Authentication/register.js';
import { login, logout } from './Controllers/Authentication/login.js';
import { addProduct } from './Controllers/Products/add.js';
import { getProducts } from './Controllers/Products/get.js';
import { deleteProduct } from './Controllers/Products/delete.js';
import {getTestimonials} from './Controllers/Testimonials/get.js';
import { addTestimonial } from './Controllers/Testimonials/add.js';
import { editProductDetails } from './Controllers/Products/update.js';
import { firebaseUploadMiddleware } from './Middleware/storageBucket.js';
import {userProfile, getAllUsers, getUserListings, deleteListing, updateListing} from './Controllers/userProfile/UserProfileController.js';

import cors from 'cors';
import session from 'express-session';
import checkUser from './Middleware/checkUser.js';


const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ["GET", 'POST', 'PUT', 'DELETE'], },))
app.use(bodyParser.json());
app.use(session({
  secret:"It's top secret",
  resave:false,
  saveUninitialized:false
}))

// API End-points

//Authentication endpionts
app.post('/register', registerUser);
app.post('/login', login);
app.post('/logout', logout);

//product endpoints
app.post('/add-product',checkUser,firebaseUploadMiddleware, addProduct);
app.get('/get-products', getProducts)


//Home page endpoints
app.get('/get-testimonials',getTestimonials)
app.post('/add-testimonial',addTestimonial)

//User data endpoints
app.get('/userprofile/:id', userProfile)
app.get('/allusers', getAllUsers)
app.get('/user-listings',checkUser,getUserListings)
app.post('/edit-product',checkUser, updateListing);
app.delete('/delete-product/:id',checkUser, deleteListing);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
