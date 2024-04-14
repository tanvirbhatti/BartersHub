import User from "../../models/useSchema.js";
import Product from "../../models/productSchema.js";
import { ObjectId } from "mongodb";

export async function addProduct(req, res) {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ error: "Invalid token, user ID not found." });
  }
  let user;
  try {
    user = await User.findOne(
      { _id: new ObjectId(userId) },
      { projection: { _id:1} }
    );
  } catch (error) {
    console.log({ error });
    res.status(400).json({ "Error occured in database": error });
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
  const newProduct = await Product.create({
    user,
    title,
    description,
    category,
    image,
    price,
    phoneNumber,
    email,
    featuredProduct: false,
  });

  return res.json({
    message: "Product added successfully",
    product: newProduct,
  });
}
