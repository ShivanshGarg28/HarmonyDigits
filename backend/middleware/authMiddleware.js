// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password
//       next();
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token provided" });
//   }
// };

// // Middleware to check if the user is an admin
// const admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Not authorized as an admin" });
//   }
// };

// module.exports = { protect, admin };


const jwt = require("jsonwebtoken");
const User = require("../models/User");
const astro = require("../models/astrologer"); // Import your Astrologer model

// Middleware to protect routes for both User & Astrologer
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find in User collection first
      let user = await User.findById(decoded.user.id).select("-password");
      let userType = "user";

      // If not found in User collection, try Astrologer collection
      if (!user) {
        user = await astro.findById(decoded.user.id).select("-password");
        userType = "astrologer";
      }

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      req.userType = userType; // store type for later checks
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware to check if the user is an admin (AND covers astrologers with role=admin)
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
