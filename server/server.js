import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import multer from 'multer';



import registerUser from './Controllers/Authentication/register.js';
import { login, logout } from './Controllers/Authentication/login.js';
import { addProduct } from './Controllers/Products/add.js';
import { getProducts } from './Controllers/Products/get.js';
import { deleteProduct } from './Controllers/Products/delete.js';
import {getTestimonials} from './Controllers/Testimonials/get.js';
import { addTestimonial } from './Controllers/Testimonials/add.js';
import { editProductDetails } from './Controllers/Products/update.js';
import { firebaseUploadMiddleware } from './Middleware/storageBucket.js';
import { userProfile, getUserListings, deleteListing, updateListing, disableUser, deleteUser, fetchAllUsers, enableUser } from './Controllers/userProfile/UserProfileController.js';

import checkUser from './Middleware/checkUser.js';
import { addFeaturedProduct } from './Controllers/FeaturedProducts/add.js';
import { getFeaturedProducts } from './Controllers/FeaturedProducts/get.js';
import { getRecentlyListedProducts } from './Controllers/RecentlyAddedProducts/get.js';


const app = express();
const upload = multer();

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
app.get('/user-listings',checkUser,getUserListings)
app.post('/edit-product',upload.none(),checkUser, updateListing);
app.delete('/delete-product/:id',checkUser, deleteListing);

app.post('/add-featured-product',addFeaturedProduct)
app.get('/get-featured-products',getFeaturedProducts)
app.get('/get-recently-products',getRecentlyListedProducts);

app.put('/users/:userId/disable', disableUser); // Endpoint to disable a user

app.put('/users/:userId/enable',enableUser);//Endpoint to enable a user

app.delete('/users/:userId', deleteUser); // Endpoint to delete a user

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
      await fetchAllUsers(req, res);
  } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});