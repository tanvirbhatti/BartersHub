import jwt from 'jsonwebtoken';

const secretKey = "abcd"

export async function getProducts(req,res){
    const token = req.session.token
    if(!token){
        res.json({err:"Unauthorized access no token"})
    }
    else{
        try { 
            // Verify JWT
            const decodedToken = jwt.verify(token, secretKey);
            // User is authenticated
            res.json({ message: `welcome ${decodedToken.firstName}` });
        } catch (error) {
            return res.status(401).json({ err: 'Unauthorized access' });
        }
    }
}