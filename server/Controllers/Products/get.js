import Product from '../../models/productSchema.js'
import { ObjectId } from 'mongodb';


export async function getProducts(req, res) {

  try {
    const products = await Product.find().exec();
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

  try {
    const product = await Product.findOne({ _id: new ObjectId(id) });

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
