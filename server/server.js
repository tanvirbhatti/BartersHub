import express from 'express';
import bodyParser from 'body-parser';
import { registerUser } from './Controllers/registerController.js';
import { login } from './Controllers/loginController.js';
import {getProducts} from './Controllers/getProductController.js'
import { addProduct } from './Controllers/addProductController.js'
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
app.post('/login', login)
app.get('/products',getProducts);
app.post('/addProduct', addProduct);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
