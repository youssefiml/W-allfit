import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header (Express normalizes headers to lowercase)
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader;

    if (!token) {
      return res.status(401).json({ error: "Token format is invalid" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(403).json({ error: "Invalid token" });
        }
        return res.status(403).json({ error: "Token verification failed" });
      }
      
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Authentication error" });
  }
};
