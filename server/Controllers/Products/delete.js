import { ObjectId } from "mongodb";
import { connectToDb } from "../../db.js";

export async function deleteProduct(req, res) {
    try {
        const db = await connectToDb();

        const userId = req.user.userId;
            
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
                    const foundFeaturedProduct = await db.collection('featuredProducts').findOne({'productId':ObjectIdProjectId})
                    console.log(foundFeaturedProduct)
                    if(!foundProduct){
                        res.json({error:"couldn't find a product"});
                    }
                    else{
                        await db.collection('products').deleteOne({_id:ObjectIdProjectId});
                        if(foundFeaturedProduct){
                            await db.collection('featuredProducts').deleteOne({'productId':ObjectIdProjectId})
                            console.log("deleted")
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