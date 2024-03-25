import { ObjectId } from 'mongodb';
import { connectToDb } from '../../db.js';

export async function addFeaturedProduct(req,res){
    const db = await connectToDb();
    const productId = req.body.productId;
    if(productId){
        try {        
            const addedFeaturedProduct = await db.collection('featuredProducts').insertOne({"productId": new ObjectId(productId)})
            
            const updatedProduct = await db.collection('products').findOneAndUpdate(
                {"_id":new ObjectId(productId)},
                {$set:{"featuredProduct":true}},
                {returnOriginal:false}
            )
            
            res.json({
                message:"product added successfully in featured collection",
                result : addedFeaturedProduct,
                result :updatedProduct.value
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