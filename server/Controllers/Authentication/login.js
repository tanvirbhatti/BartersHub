import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectToDb } from '../../db.js';

const secretKey = "abcd"

//login function
export async function login(req, res) {
    try {
  
      const db = await connectToDb();
  
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.json({ error: "Email and password are required." });
      }
  
      // Find user by email
      const foundUser = await db.collection('users').findOne({ email });
  
      if (!foundUser) {
        return res.json({ error: "User not found." });
      }
      else{
        // Compare hashed password with provided password
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
    
        if (passwordMatch) {
            try
            {   
                const token = jwt.sign({ userId: foundUser._id, firstName : foundUser.firstName }, secretKey, { expiresIn: '1h' });
                if(token){

                    req.session.token = token
                    return res.redirect('/products')
                }
                else{
                    return res.json({err:"token undefiner unauthorized access"})
                }
                
            }
            catch(err){
                console.log("error during token generation",err)
                return res.json({error:`Error during token generation -> ${err}`})
            }
        } else {
            return res.json({ error: "Incorrect password." });
        }
      }
  
      
    } catch (error) {
      console.error("Error during login:", error);
      return res.json({ error: "Internal server error." });
    }
  }