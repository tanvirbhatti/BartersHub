import { connectToDb } from "../../db.js";
import { ObjectId } from 'mongodb';


export async function getProducts(req, res) {
  const db = await connectToDb();

  try {
    const cursor = db.collection('products').find();
    const products = await cursor.toArray();
    if (products.length <= 0) {
      // Send an empty array if no products are found
      return res.json({ 'list of products': [] });
    }
    return res.json({ 'list of products': products });
  } catch (error) {
    return res.status(500).json(
      { message: "Error get product", error: error.message }
    );
  }
}

export async function getProductById(req, res) {
  const { id } = req.params; 
  const db = await connectToDb();

  try {
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json(
      { message: "Error fetching product", error: error.message }
    );
  }
}
