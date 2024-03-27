import { ObjectId } from 'mongodb';
import { connectToDb } from '../../db.js';

export async function deleteFeaturedProduct(req,res){
    const db = await connectToDb();
    const productId = req.body.productId;
    if(productId){
        try {        
            const deletedFeaturedProduct = await db.collection('featuredProducts').deleteOne({"productId": new ObjectId(productId)})
            
            const updatedProduct = await db.collection('products').findOneAndUpdate(
                {"_id":new ObjectId(productId)},
                {$set:{"featuredProduct":false}},
                {returnOriginal:false}
            )
            
            res.json({
                message:"product removed successfully from featured collection",
                result : deletedFeaturedProduct,
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