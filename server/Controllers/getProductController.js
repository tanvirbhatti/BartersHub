
export async function getProducts(req,res){
    try {
  
        const db = await connectToDb();
    
        const { userId } = req.body;
    
        if (!userId) {
          return res.json({ error: "userId are required." });
        }
    
        // Find user by email
        const result = await db.collection('product').find({ userId });
    
        if (!result) {
          return res.json({ error: "product not found." });
        }
        else{
            return res.json({ message: "Product ", product: result });
        }
    
        
      } catch (error) {
        console.error("Error during get product:", error);
        return res.json({ error: "Internal server error." });
      }
}