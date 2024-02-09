import jwt from 'jsonwebtoken';

const secretKey = "You can't hack bartersHub"

export async function getProducts(req,res){
    const token = req.session.token
    console.log(token)
    if(!token){
        res.json({err:"Unauthorized access no token"})
    }
    else{
        try {
            // Verify JWT
            const decodedToken = jwt.verify(token, secretKey);
            console.log(decodedToken)
            // User is authenticated
            res.json({ message: `welcome ${decodedToken.firstName}` });
        } catch (error) {
            return res.status(401).json({ err: 'Unauthorized access' });
        }
    }
}