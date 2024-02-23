import { connectToDb } from '../../db.js';
import  jwt from 'jsonwebtoken';


export async function addProduct(req, res) {
    try {

        const db = await connectToDb();
        const secretKey = 'abcd'; 
        
        let userId;
        // Verify and decode the token
        const token = req.session.token;
        // if(!token){
        //     res.json({error:"login error please login before you add the product"})
        // }
        // else{
        //     jwt.verify(token, secretKey, (err, decoded) => {
        //         if (err) {
        //             // Handle verification error
        //             console.error('Token verification failed:', err);
        //         } else {
        //             // Extract userId from decoded token
        //             userId = decoded.userId;
        //         }
        //     });
            
        //     if(!userId){
        //         res.json({error:"token is not trusted try login again"});
        //     }
        //     else{
                
                
    
        //     }
        console.log(req.body)
            const { title, description, category, price,phoneNumber,email } = req.body;
            const image = req.file?.firebaseUrl;    
                //Required field validation
                if (!title || !description || !category || !image || !price || !phoneNumber || !email) {
                    return res.json({ message: "Please provide all required fields" });
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
                if (!image) {
                    return res.json({ error: "Image is required." });
                }
                if (!price) {
                    return res.json({ error: "Price is required." });
                }
                if (!phoneNumber) {
                    return res.json({ error: "Phone Number is required." });
                }
        
                const newProduct = await db.collection('products').insertOne(
                    { 
                        // userId, 
                        title, 
                        description, 
                        category, 
                        image, 
                        price, 
                        phoneNumber, 
                        email 
                    });
                return res.json({ message: 'Product added successfully', product: newProduct });
        // }
    } catch (error) {
        console.error("Error during add product:", error);
        return res.json({ error: "Internal server error." });
    }
}




