const router = require("express").Router();
const { createUser, addImage } = require("../controllers/user");

// const upload = multer({ dest: "uploads/" });
// const { protect, authorize } = require("../middleware/auth");

// router.post("/create_user", protect, authorize("customer"), createUser);
router.post("/create_user", createUser);
router.post("/addimage", addImage);

module.exports = router;
