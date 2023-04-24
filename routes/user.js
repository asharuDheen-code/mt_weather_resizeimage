const router = require("express").Router();
const {
  createUser,
  addImage,
  addUser,
  getCustomers,
  getAllCustomers,
  deleteCustomer,
  getImage,
} = require("../controllers/user");

// const upload = multer({ dest: "uploads/" });
// const { protect, authorize } = require("../middleware/auth");

// router.post("/create_user", protect, authorize("customer"), createUser);
router.post("/create_user", createUser);
router.post("/add_user", addUser);
router.post("/addimage", addImage);
router.get("/getimage", getImage);
router.get("/get_customers", getCustomers);
router.get("/get_all_customers", getAllCustomers);
router.delete("/delete_customer", deleteCustomer);

module.exports = router;
