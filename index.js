require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("./app/config/mongodb.js");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// parse application/json
app.use(bodyParser.json());
var whitelist = [
  "https://ecommerce-tlt14.vercel.app/",
  "https://ecommerce-git-main-tlt14.vercel.app/",
  "https://ecommerce-liard-delta.vercel.app/",
];
var corsOptions = {
  origin: true,
  credentials: true,
};

// cors
app.use(cors(corsOptions));
// cookie parser
app.use(cookieParser());
// routes
// app.use('/api/auth', require('./app/routes/auth.js'))

// Import routes
const routes = require("./app/routes");
app.use("/", routes);
app.get("/", (req, res) => res.send("Hello World!"));
// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
