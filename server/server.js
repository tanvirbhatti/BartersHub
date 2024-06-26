import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import multer from 'multer';
import { Server as SocketIOServer } from 'socket.io';

import {registerUser} from './Controllers/Authentication/register.js';
import { login} from './Controllers/Authentication/login.js';
import {logout} from './Controllers/Authentication/logout.js';
import { addProduct } from './Controllers/Products/add.js';
import { getProducts, getProductById } from './Controllers/Products/get.js';
import { getTestimonials } from './Controllers/Testimonials/get.js';
import { addTestimonial } from './Controllers/Testimonials/add.js';
import { firebaseUploadMiddleware } from './Middleware/storageBucket.js';
import { userProfile,updateUserProfile, getUserListings, deleteListing, updateListing, disableUser, deleteUser, fetchAllUsers, enableUser } from './Controllers/userProfile/UserProfileController.js';
import checkUser from './Middleware/checkUser.js';
import { addFeaturedProduct } from './Controllers/FeaturedProducts/add.js';
import { getFeaturedProducts } from './Controllers/FeaturedProducts/get.js';
import { getRecentlyListedProducts } from './Controllers/RecentlyAddedProducts/get.js';
import { deleteFeaturedProduct } from './Controllers/FeaturedProducts/delete.js';
import { deleteProduct } from './Controllers/Products/delete.js';
import {getSearchResults} from './Controllers/Search/search.js'
import chatController from './Controllers/Chat/chatController.js';
import addCategory from './Controllers/Categories/add.js';
import getAllCategories from './Controllers/Categories/getAll.js'
import http from 'http';
import './database.js'
import {config} from 'dotenv'
import getCategories from './Controllers/Categories/get.js';
import deleteCategory from './Controllers/Categories/delete.js';

config();
const app = express();
const upload = multer();
const server = http.createServer(app); 
const io = new SocketIOServer(server, {
  cors: {
      origin: process.env.CLIENT_URI,
      methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors({ origin: process.env.CLIENT_URI, credentials: true, methods: ["GET", 'POST', 'PUT', 'DELETE'], },))
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
app.get('/search',getSearchResults)
app.get('/get-all-categories',getAllCategories)

//User data endpoints
app.get('/userprofile/:id', userProfile)
app.get('/user-listings', checkUser, getUserListings)
app.post('/update-user', checkUser,upload.none(), updateUserProfile);
app.post('/edit-product', checkUser,upload.none(), updateListing);
app.delete('/delete-product/:id', checkUser, deleteListing);

//Admin Panel endpoints
app.post('/admin/add-featured-product', addFeaturedProduct)
app.delete('/admin/delete-featured-product', deleteFeaturedProduct);
app.delete('/admin/delete-product/:productId',checkUser,deleteProduct)
app.put('/admin/disable-user/:userId', checkUser, disableUser);
app.put('/admin/enable-user/:userId', checkUser, enableUser);
app.delete('/admin/delete-user/:userId', checkUser, deleteUser);
app.get('/admin/users', fetchAllUsers);
app.post('/admin/add-category',checkUser,addCategory)
app.get('/admin/get-all-categories',checkUser, getCategories)
app.delete('/admin/delete-category',checkUser, deleteCategory)

// Chat history or chat session management endpoints
app.post('/chat/message/:senderid', checkUser, chatController.saveMessage);
app.get('/chat/history/:userId', checkUser, chatController.getChatHistory);
app.post('/chat/session', checkUser, chatController.createChatSession);
app.get('/chat/user/:userId',checkUser, chatController.getAllChatsForUser); 
app.get('/chat/listing/:listingId',checkUser, chatController.getAllChatsForListing);
app.get('/chat/listing/:listingId/user/:userId/name/:username', checkUser, chatController.getOrCreateChatSession);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
  });

  socket.on('leaveChat', (chatId) => {
      socket.leave(chatId);
      console.log(`User left chat: ${chatId}`);
  });

  socket.on('sendMessage', async (data) => {
      console.log('Message received:', data);
      const message = await chatController.saveMessage(data.fromUserId, data.fromUserName, data.toUserId, data.toUserName, data.message, data.listingId);
      socket.broadcast.emit('newMessage', message, (response) => {
        console.log("Acknowledgment received:", response);
    });
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});



// Start the server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});