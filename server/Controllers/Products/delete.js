import { ObjectId } from "mongodb";
import { connectToDb } from "../../db.js";
import jwt from 'jsonwebtoken';

const db = await connectToDb();

export async function deleteProduct(req, res) {
    try {
        const secretKey = 'abcd'; 
        
        let userId;
        // Verify and decode the token
        const token = req.session.token;
        if(!token){
            res.json({error:"login error please, login before you delete the product"})
        }
        else{
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    // Handle verification error
                    console.error('Token verification failed:', err);
                } else {
                    // Extract userId from decoded token
                    userId = decoded.userId;
                }
            });
            
            if(!userId){
                res.json({error:"token is not trusted try login again"});
            }
            else{
                const {productId} = req.params;
                const ObjectIdProjectId= new ObjectId(productId);
                console.log(productId)
                if(!productId){
                    return res.json({error:'Error selecting Product'})
                }
                else{
                    const foundProduct = await db.collection('products').findOne({_id:ObjectIdProjectId})
                    if(!foundProduct){
                        res.json({error:"couldn't find a product"});
                    }
                    else{
                        await db.collection('products').deleteOne({_id:ObjectIdProjectId});
                        return res.json({ message: 'Product deleted successfully',foundProduct});    
                    }
                }
            }
        }
            
    } catch (error) {
        console.error("Error during delete product:", error);
        return res.json({ error: "Internal server error." });
    }
}