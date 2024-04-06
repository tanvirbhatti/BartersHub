//logout function
export async function logout(req, res) {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Token is not trusted. Please try logging in again.' });
          }
        else{
            delete req.session.token;
            req.session.destroy((err) => {
                if (err) {
                  console.error("Error destroying session:", err);
                  return res.status(500).json({ error: "Error during logout." });
                }})
            return res.json({ message: "Successfully logged out", clearToken: true });
        }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }