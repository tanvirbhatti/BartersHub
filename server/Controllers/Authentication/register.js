import { connectToDb } from '../../db.js';
import bcrypt from 'bcrypt';

export async function registerUser(req, res) {
  try {

    const db = await connectToDb();
    const { firstName, lastName, email, password, province, city, areaCode } = req.body;
    const canadianProvinces = [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Nova Scotia',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Northwest Territories',
      'Nunavut',
      'Yukon'
    ];
    //Required field validation
    if (!email || !password || !firstName || !lastName || !province || !city || !areaCode) {
      return res.json({ error: "Please provide all required fields" });
    }

    if (!isNaN(firstName)) {
      return res.json({ error: "Enter valid first name" })
    }
    if (!isNaN(lastName)) {
      return res.json({ error: "Enter valid last name" })
    }
    if (!canadianProvinces.includes(province)) {
      return res.json({ error: "Enter valid province" })
    }
    if (!isNaN(city)) {
      return res.json({ error: "Enter valid city" })
    }
    if (!isValidEmail(email)) {
      return res.json({ error: "Invalid email format" })
    }

    if (!isValidPassword(password)) {
      return res.json({ error: "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters" })
    }

    //Check user with email before registration
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    //hashing password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      province,
      city,
      areaCode
    });
    return res.json({ message: "User registered successfully", user: result });
  }
  catch (error) {
    console.error('Error registering user:', error);
    res.json({ message: "Internal Server Error" });
  }
}


// Helper functions for server-side validation
function isValidEmail(email) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function isValidPassword(password) {
  return (password.length >= 8 && password.match(/[a-zA-Z]/) && password.match(/\d/) && password.match(/[!@#$%^&*()_+\\|,.<>/?]/))
}
