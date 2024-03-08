import { connectToDb } from '../../db.js';


export async function getFeaturedProducts (req,res){
    const db = await connectToDb();

    try {
        const featuredProducts = await db.collection('featuredProducts').aggregate([
            {
                $lookup: {
                    from: 'products', // Change 'products' to your actual collection name
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            }
        ]).toArray();

        res.json({ featuredProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
