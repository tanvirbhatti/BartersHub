import { connectToDb } from '../db.js';


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
        const result = await db.collection('product').insertOne({
            userId, // User ID that user upload product
            title,
            description,
            category,
            imge, // Product URL
            price,
            phoneNumber,
            email
        });

        return res.json({ message: "Product Uploaded successfully", product: result });

    } catch (error) {
        console.error("Error during login:", error);
        return res.json({ error: "Internal server error." });
    }
}




