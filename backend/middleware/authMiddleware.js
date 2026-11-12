import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.js";

export const protect = (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header ("Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Verify token using secret
      const decoded = jwt.verify(token, jwtSecret);

      // Attach user object to request (handling different payload naming conventions)
      req.user = {
        userId: decoded.userId || decoded.id || decoded._id,
      };

      if (!req.user.userId) {
        return res
          .status(401)
          .json({ message: "Not authorized, token payload invalid" });
      }

      return next();
    } catch (error) {
      console.error("JWT Verification Failed Details:", error.message); // <-- Add this
      return res
        .status(401)
        .json({ message: `Not authorized, token failed: ${error.message}` });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};
