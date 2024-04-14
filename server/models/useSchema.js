import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const provinceEnum = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon']; 

const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      password.match(/[a-zA-Z]/) &&
      password.match(/\d/) &&
      password.match(/[!@#$%^&*()_+\\|,.<>/?]/)
    );
  }

const userSchema = new mongoose.Schema(
    {
        firstName :{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator: function (v){
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message:(data)=>`${data.value} is not a valid email address!`
            }
        },
        password:{
            type:String,
            required:true,
            validate:{
                validator: function (v){
                    return isValidPassword(v)
                },
                message:(data) => `${data.value} is not a valid password \n 
                                Password should be at least 8 characters long and contain a combination of 
                                letters, numbers, and special characters`
            }
        },
        province:{
            type:String,
            required:true,
            enum:provinceEnum
        },
        city:{
            type:String,
            required:true
        },
        areaCode:{
            type:String,
            required: true,
            validate:{
                validator: function (v){
                    return /[A-Z]\d[A-Z] ?\d[A-Z]\d/.test(v);
                },
                message:(data)=>`${data.value} is not a valid Canadian area code!`
            }
        },
        disabled:{
            type:Boolean,
            default:false
        },
        userType:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        
    },
    {
        timestamps:true
    }
);


userSchema.pre('save', async function (next){
    const user = this;

    if(!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User',userSchema)

export default User;