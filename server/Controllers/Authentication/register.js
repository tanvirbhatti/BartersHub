import { connectToDb } from "../../db.js";
import bcrypt from "bcrypt";

export default async function registerUser(req, res) {
  try {
    const errors = [];
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

    //Required field validation
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !province ||
      !city ||
      !areaCode
    ) {
      errors.push({ code: "MISSING_FIELDS", message: "Please provide all required fields" });
    } else {
      if (!isNaN(firstName)) {
        errors.push({ code: "INVALID_FIRSTNAME", message: "Enter valid first name" });
      }
      if (!isNaN(lastName)) {
        errors.push({ code: "INVALID_LASTNAME", message: "Enter valid last name" });
      }
      if (!canadianProvinces.includes(province)) {
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

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } else {
      //Check user with email before registration
      try {
        const existingUser = await db
          .collection("users")
          .findOne({ email: email });

        if (existingUser) {
          return res.status(400).json({ errors: [{ code: "USER_ALREADY_EXISTS", message: "User already exists" }] });
        }
      } catch (err) {
        return res.status(500).json({ errors: [{ code: "INTERNAL_SERVER_ERROR", message: "Internal server error" }] });
      }

      //hashing password before storing it
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
    res.status(500).json({ errors: [{ code: "INTERNAL_SERVER_ERROR", message: "Internal server error" }] });
  }
}

// Helper functions for server-side validation
function isValidEmail(email) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function isValidPassword(password) {
  return (
    password.length >= 8 &&
    password.match(/[a-zA-Z]/) &&
    password.match(/\d/) &&
    password.match(/[!@#$%^&*()_+\\|,.<>/?]/)
  );
}

function isValidAreaCode(areaCode) {
  return areaCode.match(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);
}
