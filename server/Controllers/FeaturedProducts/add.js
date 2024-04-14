import { ObjectId } from 'mongodb';
import FeaturedProduct from '../../models/featuredProductSchema.js';
import Product from '../../models/productSchema.js';

export async function addFeaturedProduct(req,res){
    const productId = req.body.productId;
    if(productId){
        try {        
            const addedFeaturedProduct = await FeaturedProduct.create({"product": new ObjectId(productId)})
            
            const updatedProduct = await Product.findOneAndUpdate(
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