const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
// const Admin = require("../models/Admin");
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  let role;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    role = req.headers.authorization.split(" ")[2];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decoded });
    req.user = await User.findById(decoded.id);
    // if (role === "user") {
    // } else {
    //   // req.user = await Admin.findById(decoded.id);
    // }

    // req.user = await Admin.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse("Not authorized to access this route two ", 401)
    );
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req?.user?.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user?.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
