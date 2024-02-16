import { ObjectId } from "mongodb";
import { connectToDb } from "../../db.js";
import jwt from "jsonwebtoken";

const db = await connectToDb();
export async function editProductDetails(req, res) {
    try {
        const secretKey = "abcd";

        let userId;
        // Verify and decode the token
        const token = req.session.token;
        if (!token) {
            res.json({
                error: "login error please, login before you edit the product details",
            });
        } else {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    // Handle verification error
                    console.error("Token verification failed:", err);
                } else {
                    // Extract userId from decoded token
                    userId = decoded.userId;
                }
            });

            if (!userId) {
                res.json({ error: "token is not trusted try login again" });
            } else {
                const { productId } = req.params;
                const { title, description, category, image, price, phoneNumber} = req.body;
                const ObjectIdProjectId= new ObjectId(productId);
                if (!productId) {
                    return res.json({ error: "Error selecting Product" });
                } else {
                    const foundProduct = await db
                        .collection("products")
                        .findOne({ _id: ObjectIdProjectId });
                    if (!foundProduct) {
                        res.json({ error: "couldn't find a product" });
                    } else {
                        await db.collection("products").updateOne({ _id: ObjectIdProjectId }, {
                            $set: {
                                title, 
                                description, 
                                category, 
                                image, 
                                price, 
                                phoneNumber
                            }
                        });
                        return res.json({ message: "Product updated successfully" });
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error during update product:", error);
        return res.json({ error: "Internal server error." });
    }
}
