import express from 'express';
import bodyParser from 'body-parser';
import registerUser from './Controllers/Authentication/register.js';
import { login } from './Controllers/Authentication/login.js';
import { addProduct } from './Controllers/Products/add.js';
import { getProducts } from './Controllers/Products/get.js';
import { editProductDetails } from './Controllers/Products/update.js';
import { deleteProduct } from './Controllers/Products/delete.js';
import {getTestimonials} from './Controllers/Testimonials/get.js';
import { addTestimonial } from './Controllers/Testimonials/add.js';
import cors from 'cors';
import session from 'express-session';


const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ["GET", 'POST', 'PUT', 'DELETE'], },))
app.use(bodyParser.json());
app.use(session({
  secret:"It's top secret",
  resave:false,
  saveUninitialized:false
}))

// API End-points
app.post('/register', registerUser);
app.post('/login', login);
app.post('/add-product', addProduct);
app.get('/get-products', getProducts)
app.put('/edit-product/:productId', editProductDetails);
app.delete('/delete-product/:productId', deleteProduct);
app.get('/get-testimonials',getTestimonials)
app.post('/add-testimonial',addTestimonial)

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
