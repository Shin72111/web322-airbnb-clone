const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const fileupload = require("express-fileupload");

require("dotenv").config();

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(fileupload());

app.use((req, res, next) => {
  res.locals.user = req.session.userInfo;
  next();
});

const userRouter = require("./routes/User");
const adminRouter = require("./routes/Admin");
const generalRouter = require("./routes/General");
const { redirectAdminRoutes } = require("./utils/redirectMiddleware");
app.use("/admin/", redirectAdminRoutes, adminRouter);
app.use("/user/", userRouter);
app.use("/", generalRouter);

const PORT = process.env.PORT || 3000;

const DBURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@web322-airbnb-xcvfi.mongodb.net/airbnb?retryWrites=true&w=majority`;
mongoose
  .connect(DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Something went wrong: ${err}`);
  });
