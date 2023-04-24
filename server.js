const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

// Load env vars
dotenv.config({ path: "./config/.env" });

const app = express();

//cors policy
app.use(
  cors({
    origin: "*",
  })
);

// Connect to database
connectDB();

app.use("/images", express.static("public"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route files
const auth = require("./routes/auth");
const user = require("./routes/user");

// mount routers
app.use("/api/auth", auth);
app.use("/api/user", user);

const PORT = 8080;
app.listen(PORT, console.log(`port is running ${PORT}`));
