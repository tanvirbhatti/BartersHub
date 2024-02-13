import { connectToDb } from './db.js';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Product } = require('./Model/product.js');

export async function addProduct(req, res) {
    try {

        const db = await connectToDb();

        const { userId, title, description, category, imge, price, phoneNumber, email } = req.body;

        //Required field validation
        if (!userId || !title || !description || !category || !imge || !price || !phoneNumber || !email) {
            return res.json({ message: "Please provide all required fields" });
        }

        if (!userId) {
            return res.json({ error: "User ID is required." });
        }
        if (!title) {
            return res.json({ error: "Title is required." });
        }

        if (!description) {
            return res.json({ error: "Description is required." });
        }
        if (!category) {
            return res.json({ error: "Category is required." });
        }
        if (!imge) {
            return res.json({ error: "Imge is required." });
        }
        if (!price) {
            return res.json({ error: "Price is required." });
        }
        if (!phoneNumber) {
            return res.json({ error: "Phone Number is required." });
        }
        if (!email) {
            return res.json({ error: "Phone Number is required." });
        }

        // const { userId, title, description, category, image, price, phoneNumber, email } = req.body;

        // Check if the user exists before adding the product
        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
          return res.status(400).json({ message: 'User does not exist', error: 'UserNotFound' });
        }
    
        const newProduct = new Product({ userId, title, description, category, image, price, phoneNumber, email });
        await newProduct.save();
        return res.json({ message: 'Product added successfully', product: newProduct });
  


    } catch (error) {
        console.error("Error during add product:", error);
        return res.json({ error: "Internal server error." });
    }
}

// delete product 
export async function deleteProduct(req, res) {
    try {
        await Product.findByIdAndDelete(productId);
        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error during delete product:", error);
        return res.json({ error: "Internal server error." });
    }
}

export async function updatedProduct(req, res) {
    const productId = req.params.productId;

    try {
        const { userId, title, description, category, image, price, phoneNumber, email } = req.body;

    // Check if the user exists before updating the product
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(400).json({ message: 'User does not exist', error: 'UserNotFound' });
    }

    await Product.findByIdAndUpdate(productId, { userId, title, description, category, image, price, phoneNumber, email });
    return res.json({ message: 'Product updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}

export async function getProduct(req, res) {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'User Id is required ', error: 'UserIdNotFound' });
        }
      try {
        const products = await Product.find({userId : req.params.userId});
        return res.json(products);
      } catch (error) {
        return res.status(500).json({ message: 'Error get product', error: error.message });
      }
}