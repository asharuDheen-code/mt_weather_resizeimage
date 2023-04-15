const multer = require("multer");
const { uuid } = require("uuidv4");
//
const User = require("../models/User");
const Image = require("../models/Image");

// multer
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "-" + fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

exports.createUser = async (req, res) => {
  try {
    const response = await User.create(req.body);
    res.status(200).json({
      success: true,
      message: "succefully registered",
      user: req.body,
      //   response,
    });
  } catch (err) {
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

exports.addImage = async (req, res) => {
  try {
    const singleImage = upload.single("image");
    singleImage(req, res, async function (err) {
      const url = req.protocol + "://" + req.get("host");
      const user = new Image({
        name: req?.file?.originalname,
        image: url + "/public/" + req?.file?.filename,
      });
      // const response = await Image.create({
      //   name: req.body.name,
      //   image: url + "/public/" + req?.file?.filename,
      // });
      // console.log("req body", req.body);
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
              _id: result._id,
              profileImg: result.profileImg,
            },
          });
        })
        .catch((err) => {
          console.log(err),
            res.status(500).json({
              error: err,
            });
        });
    });
  } catch (err) {
    console.log("all error", err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};
