import Product from '../../models/productSchema.js'

export const getRecentlyListedProducts = async (req,res)=>{

    try{
        const result =  await Product.find().sort({_id:-1}).limit(10).exec()
        return res.status(200).json(result)
    }
    catch(error){
        return res.status(500).json({error:"error occured fethcing the featured products"})
    }
}