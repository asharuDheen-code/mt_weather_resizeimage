const User = require("../models/User");

// Get token from model, create cookie and send response
const sendTokenResponse = (user, res) => {
  const { email, password, role, _id } = user;
  const token = user.getSignedJwtToken();
  res.status(200).json({
    user,
    token,
    success: true,
    message: "welcome back",
  });
};

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = async (req, res) => {
  //This req.user come from middleware -> auth -> protect
  const admin = await User.findById(req.user.id);

  if (admin.role === "admin") {
    res.status(200).json({
      success: true,
      admin,
    });
  }
};

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res) => {
  try {
    // req.body.role = "customer";
    console.log("req body", req.body);
    const response = await User.create(req.body);
    res.status(200).json({
      success: true,
      message: "succefully registered",
      response,
    });
  } catch (err) {
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(req.body);
  try {
    const checkMail = await User.findOne({ email }).select("+password");
    if (!checkMail) {
      res.status(200).json({
        success: false,
        message: "There is no user corresponding to the email address.",
      });
    } else {
      // const checkPassword = await Admin.findOne({ password });
      const checkPassword = await checkMail.matchPassword(password);
      if (!checkPassword) {
        res.status(200).json({
          success: false,
          message: "Wrong password",
        });
      } else {
        sendTokenResponse(checkMail, res);
        // Admin.getSignedJwtToken();
      }
    }
  } catch (error) {
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};
