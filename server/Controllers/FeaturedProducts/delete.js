import { ObjectId } from 'mongodb';
import FeaturedProduct from '../../models/featuredProductSchema.js';
import Product from '../../models/productSchema.js';

export async function deleteFeaturedProduct(req,res){
    const productId = req.body.productId;
    if(productId){
        try {        
            const deletedFeaturedProduct = await FeaturedProduct.deleteOne({"product": new ObjectId(productId)})
            
            const updatedProduct = await Product.findOneAndUpdate(
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