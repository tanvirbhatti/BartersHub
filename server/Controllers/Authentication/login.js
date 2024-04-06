import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDb } from "../../db.js";

const secretKey = "abcd";

//login function
export async function login(req, res) {
  try {
    const db = await connectToDb();

    const { email, password } = req.body || "";

    if (email && password) {
      // Find user by email
      const foundUser = await db.collection("users").findOne({ email });

      if (!foundUser) {
        return res.json({ error: "User not found." });
      } else {
        // Compare hashed password with provided password
        const passwordMatch = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (passwordMatch) {
          try {
            const token = jwt.sign(
              {
                userId: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                email: foundUser.email,
                province: foundUser.province,
                city: foundUser.city,
                areaCode: foundUser.areaCode,
                userType: foundUser.userType
              },
              secretKey,
              { expiresIn: "3h" }
            );

            if (token) {
              req.session.token = token;
              if (foundUser.userType === "admin") {
                return res.json({ message: "Successfully logged In as admin", token, isAdmin: true });
              } else {
                return res.json({ message: "Successfully logged In", token, isAdmin: false });
              }
            } else {
              return res.status(500).json({ error: "Unauthorized access" });
            }
          } catch (err) {
            console.log("error during token generation", err);
            return res.status(500).json({
              error: `Error during token generation -> ${err}`,
            });
          }
        } else {
          return res.status(401).json({ error: "Incorrect password." });
        }
      }
    } else {
      return res.status(400).json({ error: "Email and password both are required." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}


