import { connectToDb } from "../../db.js";

export async function addProduct(req, res) {
  const db = await connectToDb();

  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ error: "Invalid token, user ID not found." });
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
    userId,
    title,
    description,
    category,
    image,
    price,
    phoneNumber,
    email,
  });

  return res.json({
    message: "Product added successfully",
    product: newProduct,
  });
}
