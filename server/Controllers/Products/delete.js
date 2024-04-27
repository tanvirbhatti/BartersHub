import { ObjectId } from "mongodb";
import Product from '../../models/productSchema.js'
import FeaturedProduct from '../../models/featuredProductSchema.js'

export async function deleteProduct(req, res) {
    try {
        const userId = req.user.userId;
            
            if(!userId){
                res.json({error:"token is not trusted try login again"});
            }
            else{
                const {productId} = req.params;
                const ObjectIdProjectId= new ObjectId(productId);
                if(!productId){
                    return res.json({error:'Error selecting Product'})
                }
                else{
                    const foundProduct = await Product.findOne({_id:ObjectIdProjectId})
                    const foundFeaturedProduct = await FeaturedProduct.findOne({'product':ObjectIdProjectId})
                    if(!foundProduct){
                        res.json({error:"couldn't find a product"});
                    }
                    else{
                        await Product.deleteOne({_id:ObjectIdProjectId});
                        if(foundFeaturedProduct){
                           await FeaturedProduct.deleteOne({'product':ObjectIdProjectId})
                        }
                        return res.json({ message: 'Product deleted successfully',foundProduct});    
                    }
                }
        }
            
    } catch (error) {
        console.error("Error during delete product:", error);
        return res.json({ error: "Internal server error." });
    }
}