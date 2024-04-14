import FeaturedProduct from "../../models/featuredProductSchema.js";

export async function getFeaturedProducts (req,res){

    try {
        const featuredProducts = await FeaturedProduct.find().populate('product').exec();
        res.status(200).json({ featuredProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
