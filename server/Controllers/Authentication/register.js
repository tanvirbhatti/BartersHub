import User from '../../models/useSchema.js'
import { provinceEnum } from '../../models/useSchema.js'

export const registerUser = async (req,res)=>{
    try{
        const errors = []
        const { firstName, lastName, email, password, province, city, areaCode } = req.body;        
        
        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !province ||
            !city ||
            !areaCode
          ) 
          {
            errors.push({ code: "MISSING_FIELDS", message: "Please provide all required fields" });
          } 
          else {
            if (!isNaN(firstName)) {
              errors.push({ code: "INVALID_FIRSTNAME", message: "Enter valid first name" });
            }
            if (!isNaN(lastName)) {
              errors.push({ code: "INVALID_LASTNAME", message: "Enter valid last name" });
            }
            if (!provinceEnum.includes(province)) {
              errors.push({ code: "INVALID_PROVINCE", message: "Enter valid province" });
            }
            if (!isNaN(city)) {
              errors.push({ code: "INVALID_CITY", message: "Enter valid city" });
            }
            if (!isValidEmail(email)) {
              errors.push({ code: "INVALID_EMAIL", message: "Invalid email format" });
            }
      
            if (!isValidPassword(password)) {
              errors.push({ code: "INVALID_PASSWORD", message: "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters" });
            }
      
            if (!isValidAreaCode(areaCode)) {
              errors.push({ code: "INVALID_AREA_CODE", message: "The Area code format must be like this A1A 1A1" });
            }
          }

          if(errors.length>0){
            return res.status(400).json({errors});
          }
          else{
            try {
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    return res.status(400).json({ errors: [{ code: "USER_ALREADY_EXISTS", message: "User already exists" }] });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ code: "INTERNAL_SERVER_ERROR", message: "Internal server error" }] });
            }
          }

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password,
            city,
            areaCode,
            province
        })  
        
        await newUser.save();

        return res.status(200).json({
            message : 'Registered a User Successfully',
            user:newUser
        })
    }
    catch(error){
        console.error('Error registering user:', error);
        return res.status(500).json({ errors: [{ code: "INTERNAL_SERVER_ERROR", message: "Internal server error" }] });
    }
}

// Helper functions for server-side validation
const isValidEmail = (email)=> {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  
const isValidPassword = (password)=>{
    return (
      password.length >= 8 &&
      password.match(/[a-zA-Z]/) &&
      password.match(/\d/) &&
      password.match(/[!@#$%^&*()_+\\|,.<>/?]/)
    );
  }
  
const isValidAreaCode  = (areaCode)=>{
    return areaCode.match(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);
  }