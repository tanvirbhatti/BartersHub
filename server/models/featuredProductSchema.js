import mongoose from 'mongoose';

const featuredProductSchema = new mongoose.Schema({
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true
  }  
})

const FeaturedProduct = mongoose.model('FeaturedProduct',featuredProductSchema);

export default FeaturedProduct;