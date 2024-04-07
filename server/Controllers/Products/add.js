import { connectToDb } from "../../db.js";
import {ObjectId} from 'mongodb';

export async function addProduct(req, res) {
  const db = await connectToDb();

  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ error: "Invalid token, user ID not found." });
  }
  let user;
  try {
    user = await db.collection('users').findOne(
      {_id:new ObjectId(userId)},
      {projection: {password:0, userType: 0, disabled:0}}
    )
  } catch (error) {
      console.log({error})
      res.status(400).json({"Error occured in database":error})    
  }
  const { title, description, category, price, phoneNumber, email } = req.body;
  const image = req.file?.firebaseUrl;

  // Validate the product information...
  if (
    !title ||
    !description ||
    !category ||
    !image ||
    !price ||
    !phoneNumber ||
    !email
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  // Insert the new product into the database
  const newProduct = await db.collection("products").insertOne({
    user,
    title,
    description,
    category,
    image,
    price,
    phoneNumber,
    email,
    featuredProduct:false
  });

  return res.json({
    message: "Product added successfully",
    product: newProduct,
  });
}
