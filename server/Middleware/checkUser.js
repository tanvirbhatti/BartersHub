import jwt from 'jsonwebtoken';

const secretKey = 'abcd';

const checkUser = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ error: "No authorization token provided." });
    }

    const token = tokenHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Login error, please login before accessing this resource." });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ error: "Token is not trusted, try logging in again." });
        }

        // Attach user info to the request object
        req.user = decoded;
        next();
    });
};

export default checkUser;
