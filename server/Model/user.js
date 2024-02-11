const mongoose = require('mongoose');

const canadianProvinces = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"];

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true,
        validate: {
            validator: value => canadianProvinces.includes(value),
            message: "Enter valid province"
        }
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: value => isValidPassword(value),
            message: "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters"
        }
    }
});

// Validation function for email format
function isValidEmail(email) {
    // Implement your email validation logic here
    // Example: Check if it follows a basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation function for password format
function isValidPassword(password) {
    // Implement your password validation logic here
    // Example: Check if it's at least 8 characters and contains a combination of letters, numbers, and special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
