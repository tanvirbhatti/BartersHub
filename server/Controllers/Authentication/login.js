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
              },
              secretKey,
              { expiresIn: "3h" }
            );
            if (token) {
              req.session.token = token;
              return res.json({ message: "Successfully logedIn", token });
            } else {
              return res.json({ err: "token undefiner unauthorized access" });
            }
          } catch (err) {
            console.log("error during token generation", err);
            return res.json({
              error: `Error during token generation -> ${err}`,
            });
          }
        } else {
          return res.json({ error: "Incorrect password." });
        }
      }
    } else {
      return res.json({ error: "Email and password both are required." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.json({ error: "Internal server error." });
  }
}

//logout function
export async function logout(req, res) {
  try {
    // Check if the token exists in the session
    if (req.session.token) {
      // Invalidate the session token
      delete req.session.token;

      // Optionally, you can destroy the entire session
      req.session.destroy((err) => {
        if (err) {
          return res.json({ error: "Error during logout." });
        }

        // Clear the client-side cookie
        res.clearCookie("connect.sid"); // Adjust the cookie name based on your configuration

        return res.json({ message: "Successfully logged out" });
      });
    } else {
      return res.json({ error: "No active session found." });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.json({ error: "Internal server error." });
  }
}
