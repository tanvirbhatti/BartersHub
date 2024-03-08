import { ObjectId } from 'mongodb';
import { connectToDb } from '../../db.js';

export async function addFeaturedProduct(req,res){
    const db = await connectToDb();
    const productId = req.body.productId;
    if(productId){
        try {        
            const addedFeaturedProduct =db.collection('featuredProducts').insertOne({"productId": new ObjectId(productId)})
            res.json({
                message:"product added successfully in featured collection",
                result : addedFeaturedProduct
            })
        } catch (error) {
            res.json({
                error
            })
        }
    }
    else{
        res.json({
            error:"productId is required"
        })
    }
}