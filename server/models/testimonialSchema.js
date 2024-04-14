import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    testimonialText:{
        type: String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    userConsent:{
        type:Boolean,
        default: true
    },
    testimonialProduct:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true
});

const Testimonial = mongoose.model('Testimonial',testimonialSchema)

export default Testimonial;