const { connectToDb } = require("../db.js");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const db = await connectToDb();
    const { firstName, lastName, email, password, province, city, areaCode } =
      req.body;
    const canadianProvinces = [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Nova Scotia",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Northwest Territories",
      "Nunavut",
      "Yukon",
    ];

    const errors = [];

    // Required field validation
    if (!email || !password || !firstName || !lastName || !province || !city || !areaCode) {
      errors.push({ error: "Please provide all required fields" });
    } else {
      // Additional validation only if required fields are present
      if (!isNaN(firstName)) {
        errors.push({ error: "Enter valid first name" });
      }
      if (!isNaN(lastName)) {
        errors.push({ error: "Enter valid last name" });
      }
      if (!canadianProvinces.includes(province)) {
        errors.push({ error: "Enter valid province" });
      }
      if (!isNaN(city)) {
        errors.push({ error: "Enter valid city" });
      }
      if (!isValidEmail(email)) {
        errors.push({ error: "Invalid email format" });
      }
      if (!isValidAreacode(areaCode)) {
        errors.push({ error: "Invalid area code format" });
      }
      if (!isValidPassword(password)) {
        errors.push({
          error:
            "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters",
        });
      }
    }

    if (errors.length > 0) {
      return res.json({ errors });
    } else {
      // Rest of the function remains the same
      const existingUser = await db
        .collection("users")
        .findOne({ email: email });
      if (existingUser) {
        return res.json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.collection("users").insertOne({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        province,
        city,
        areaCode,
      });
      return res.json({
        message: "User registered successfully",
        user: result,
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ message: "Internal Server Error" });
  }
}

// Helper functions for server-side validation
function isValidEmail(email) {
  return email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function isValidPassword(password) {
  return (
    password &&
    password.length >= 8 &&
    password.match(/[a-zA-Z]/) &&
    password.match(/\d/) &&
    password.match(/[!@#$%^&*()_+\\|,.<>/?]/)
  );
}

function isValidAreacode(areaCode) {
  return areaCode && areaCode.match(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);
}

module.exports = registerUser;
