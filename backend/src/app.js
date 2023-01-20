const express = require("express");
const ErrorHandler = require("./middlewares/error");
const Store=require("./routes/productRoute")
const User=require("./routes/userRoute")
const cookie=require("cookie-parser")
const app = express();
app.use(cookie())
app.use(express.json());


app.use(User)
app.use(Store)

//Error Handler middleware
app.use(ErrorHandler);
module.exports = app;
