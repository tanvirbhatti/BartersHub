import express from 'express';
import bodyParser from 'body-parser';
import { registerUser } from './userController.js';

const app = express();
app.use(bodyParser.json());

// Register route
app.post('/register', registerUser);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
