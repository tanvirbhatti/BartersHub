// Create a Product schema
const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    category: String,
    image: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        // Simple email validation
        match: /^\S+@\S+\.\S+$/
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };