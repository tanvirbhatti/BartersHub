import {connectToDb} from '../../db.js'

export async function getRecentlyListedProducts(req,res){
    const db = await connectToDb();

    const cursor =  db.collection('products').find().sort({_id:-1}).limit(10)
    const result = await cursor.toArray()
    return res.json(result)
}