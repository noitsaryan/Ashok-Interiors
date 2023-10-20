const express = require("express");
const router = require("./routes/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();

const app = express();

// Middlewares
app.use(compression())
app.use(express.static("public"));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

// Initializer
app.get("/", (req, res) => {
  res.send(`Server is listening @${process.env.PORT}`);
});

// Port Listening
app.listen(process.env.PORT);
