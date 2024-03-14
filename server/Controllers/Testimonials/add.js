import { connectToDb } from '../../db.js';
import  jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function addTestimonial(req, res) {
    try {

        const db = await connectToDb();
        const secretKey = 'abcd'; 
        
        let userId;
        // Verify and decode the token
        const token = req.session.token;
        if(!token){
            res.status(401).json({error:"login error please login before you add the product"})
        }
        else{
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    // Handle verification error
                    res.status(401).json('Token verification failed:', err);
                } else {
                    // Extract userId from decoded token
                    userId = decoded.userId;
                }
            });
            
            if(!userId){
                res.status(401.01).json({error:"token is not trusted try login again"});
            }
            else{
                
                const { testimonialText, rating, userConsent, testimonialProduct} = req.body;
    
                if (!testimonialText) {
                    return res.json({ error: "Testimonial text is reqiured" });
                }
                //Required field validation
                if (!testimonialText || !userConsent) {
                    return res.json({ error: "Please provide all required fields" });
                }

                const user = await db.collection('users').findOne({_id: new ObjectId(userId)});
                const timeStamp = new Date();
                const newTestimonial = await db.collection('testimonials').insertOne(
                    { 
                        testimonialText, rating, userConsent, testimonialProduct, timeStamp, user
                    });
                return res.status(200).json({ message: 'Testimonial Added Successfully', newTestimonial });
            }
        }
    } catch (error) {
        console.error("Error during add testimonial:", error);
        return res.json({ error: "Internal server error." });
    }
}




