const express = require("express");
const ErrorHandler = require("./middlewares/error");
const Store=require("./routes/shopRoute")
const User=require("./routes/userRoute")
const cookie=require("cookie-parser")
const multer=require("multer")
const app = express();
app.use(express.json());
app.use(cookie())
app.use(multer().any())
app.use(User)
app.use(Store)

//Error Handler middleware
app.use(ErrorHandler);
module.exports = app;
