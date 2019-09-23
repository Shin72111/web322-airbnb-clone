const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  console.log(typeof req.body.birthday);
  const date = new Date(req.body.birthday);
  console.log(date.toISOString());
  console.log(req.body);
  res.render("signup");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
