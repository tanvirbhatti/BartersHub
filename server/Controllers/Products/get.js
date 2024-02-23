import { connectToDb } from "../../db.js";

export async function getProducts(req, res) {
  
  const db = await connectToDb();

  try {
    const cursor = db.collection('products').find();
    const products = await cursor.toArray();
    if (products.length <= 0) {
      // Send an empty array if no products are found
      return res.json({'list of products': []});
    }
    return res.json({'list of products': products});
  } 
  catch (error) {
    return res.status(500).json(
      { message: "Error get product", error: error.message }
    );
  }
}
