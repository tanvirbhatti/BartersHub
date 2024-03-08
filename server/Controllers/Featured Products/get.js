import { connectToDb } from '../../db.js';


export async function getFeaturedProducts (req,res){
    const db = await connectToDb();

    const featuredProducts = await db.collection('featuredProducts').find({}).toArray()
    return res.json({featuredProducts})
}
