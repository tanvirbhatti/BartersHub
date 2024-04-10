import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import multer from 'multer';
import { Server as SocketIOServer } from 'socket.io';

import registerUser from './Controllers/Authentication/register.js';
import { login} from './Controllers/Authentication/login.js';
import {logout} from './Controllers/Authentication/logout.js';
import { addProduct } from './Controllers/Products/add.js';
import { getProducts, getProductById } from './Controllers/Products/get.js';
import { getTestimonials } from './Controllers/Testimonials/get.js';
import { addTestimonial } from './Controllers/Testimonials/add.js';
import { firebaseUploadMiddleware } from './Middleware/storageBucket.js';
import { userProfile, getUserListings, deleteListing, updateListing, disableUser, deleteUser, fetchAllUsers, enableUser } from './Controllers/userProfile/UserProfileController.js';
import checkUser from './Middleware/checkUser.js';
import { addFeaturedProduct } from './Controllers/FeaturedProducts/add.js';
import { getFeaturedProducts } from './Controllers/FeaturedProducts/get.js';
import { getRecentlyListedProducts } from './Controllers/RecentlyAddedProducts/get.js';
import { deleteFeaturedProduct } from './Controllers/FeaturedProducts/delete.js';
import { deleteProduct } from './Controllers/Products/delete.js';
import chatController from './Controllers/Chat/chatController.js';
import http from 'http';



const app = express();
const upload = multer();
const server = http.createServer(app); 
const io = new SocketIOServer(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ["GET", 'POST', 'PUT', 'DELETE'], },))
app.use(bodyParser.json());
app.use(session({
  secret: "It's top secret",
  resave: false,
  saveUninitialized: false
}))

// API End-points

//Authentication endpionts
app.post('/register', registerUser);
app.post('/login', login);
app.post('/logout',checkUser, logout);

//product endpoints
app.post('/add-product', checkUser, firebaseUploadMiddleware, addProduct);
app.get('/get-products', getProducts)
app.get('/get-product/:id', getProductById)


//Home page endpoints
app.get('/get-testimonials', getTestimonials)
app.post('/add-testimonial', addTestimonial)
app.get('/get-featured-products', getFeaturedProducts)
app.get('/get-recently-products', getRecentlyListedProducts);

//User data endpoints
app.get('/userprofile/:id', userProfile)
app.get('/user-listings', checkUser, getUserListings)
app.post('/edit-product', checkUser, updateListing);
app.delete('/delete-product/:id', checkUser, deleteListing);

//Admin Panel endpoints
app.post('/admin/add-featured-product', addFeaturedProduct)
app.delete('/admin/delete-featured-product', deleteFeaturedProduct);
app.delete('/admin/delete-product/:productId',checkUser,deleteProduct)
app.put('/admin/disable-user/:userId', checkUser, disableUser);
app.put('/admin/enable-user/:userId', checkUser, enableUser);
app.delete('/admin/delete-user/:userId', checkUser, deleteUser);
app.get('/admin/users', fetchAllUsers);

// Chat history or chat session management endpoints
app.post('/chat/message/:senderid', checkUser, chatController.saveMessage);
app.get('/chat/history/:userId', checkUser, chatController.getChatHistory);
app.post('/chat/session', checkUser, chatController.createChatSession);
app.get('/chat/user/:userId',checkUser, chatController.getAllChatsForUser); 
app.get('/chat/listing/:listingId',checkUser, chatController.getAllChatsForListing);
app.get('/chat/listing/:listingId/user/:userId', checkUser, chatController.getOrCreateChatSession);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (data) => {
      console.log('Message received:', data);
      chatController.saveMessage(data.fromUserId, data.toUserId,data.message, data.listingId);
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});


// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});