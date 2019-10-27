const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require("moment");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const options = {
  auth: {
    api_key:
      "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"
  }
};
const mailer = nodemailer.createTransport(sgTransport(options));

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }
});

const User = new mongoose.model("User", UserSchema);

const isNullInputField = input => {
  return input === undefined || input === null || input == "";
};

const isName = name => /^[A-Za-z]{2,}$/.test(name);

const isEmail = email =>
  /^[a-z][a-z0-9.]+\@[a-z]{3,}\.[a-z]{2,6}$/i.test(email.toLowerCase());

const isValidPassword = password => {
  if (password.length <= 32 && password.length >= 8) {
    return /^[A-Za-z0-9]*$/.test(password);
  }
  return false;
};

const isValidBirthday = birthdayStr => {
  const today = moment(new Date());
  const birthday = moment(new Date(birthdayStr));

  return today.diff(birthday, "years") >= 18;
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const errors = {};

  if (isNullInputField(req.body.firstname)) {
    errors.firstnameError = "First name is required";
  } else if (!isName(req.body.firstname)) {
    errors.firstnameError = "First name can contain only alphabet characters";
  }

  if (isNullInputField(req.body.lastname)) {
    errors.lastnameError = "Last name is required";
  } else if (!isName(req.body.lastname)) {
    errors.lastnameError = "Last name can contain only alphabet characters";
  }

  if (isNullInputField(req.body.email)) {
    errors.emailError = "Email is required";
  } else if (!isEmail(req.body.email)) {
    errors.emailError = "Email is invalid";
  }

  if (isNullInputField(req.body.password)) {
    errors.passwordError = "Password is required";
  } else if (!isValidPassword(req.body.password)) {
    errors.passwordError =
      "Password needs to be from 8 to 32 characters with letters and numbers only";
  }

  if (isNullInputField(req.body.birthday)) {
    errors.birthdayError = "Birthday is required";
  } else if (!isValidBirthday(req.body.birthday)) {
    errors.birthdayError = "You need to be at least 18 to signup";
  }

  if (Object.keys(errors).length > 0) {
    res.render("signup", { ...errors, ...req.body });
  } else {
    const text = `
    Dear ${req.body.lastname},
      You have registered successfully at Airbnb.
      
      Thank you for choosing us!
      
    Best regards,
    WEB322-Airbnb Admin`;

    const html = `
    <p>Dear ${req.body.lastname},<br>
      &nbsp;&nbsp;&nbsp;&nbsp;You have registered successfully at Airbnb.<br>
      &nbsp;&nbsp;&nbsp;&nbsp;Thank you for choosing us!
    </p>
    <p>
    Best regards,<br>
    WEB322-Airbnb Admin
    </p>
    `;
    const emailInfo = {
      to: req.body.email,
      from: "tam.tran72111@gmail.com",
      subject: "Web322-Airbnb Registration Successfully",
      text,
      html
    };

    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email.toLowerCase(),
      password: req.body.password, // TODO: hash the password before saving
      birthday: new Date(req.body.birthday)
    };
    const user = new User(userInfo);
    user
      .save()
      .then(() => {
        console.log(`Successfully created user with email: ${userInfo.email}`);
        mailer.sendMail(emailInfo, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Message sent: ${info.response}`);
          }
        });
      })
      .catch(err => {
        console.log(
          `Cannot insert user with email ${userInfo.email} because:\n${err}`
        );
      });
    res.redirect("/dashboard");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const errors = {};

  if (isNullInputField(req.body.email)) {
    errors.emailError = "Email is required";
  } else if (!isEmail(req.body.email)) {
    errors.emailError = "Email is invalid";
  }

  if (isNullInputField(req.body.password)) {
    errors.passwordError = "Password is required";
  } else if (!isValidPassword(req.body.password)) {
    errors.passwordError =
      "Password needs to be from 8 to 32 characters with letters and numbers only";
  }

  if (Object.keys(errors).length > 0) {
    res.render("login", { ...errors, ...req.body });
  } else {
    /*
      TODO: implement authentication
    */
    res.redirect("/dashboard");
  }
});

app.get("/rooms", (req, res) => {
  const rooms = [
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/10833886/1edf8559_original.jpg?aki_policy=large",
        alt: "Entire apartment - HVAR image"
      },
      info: "Entire apartment - HVAR",
      title: "The best position in Hvar!",
      price: 88,
      rating: "4.77",
      bookCount: 366
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/19327619/cbb26fd1_original.jpg?aki_policy=large",
        alt: "Entire apartment - Minsk image"
      },
      info: "Entire apartment - Minsk",
      title: "Minsk Belarus Studio in historical center",
      price: 60,
      rating: "4.79",
      bookCount: 344
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/10026520/717f5adc_original.jpg?aki_policy=large",
        alt: "Private room - Ermelo image"
      },
      info: "Private room - Ermelo",
      title: "Charming gardenroom with woodstove",
      price: 78,
      rating: "4.80",
      bookCount: 62
    },
    {
      image: {
        src:
          "https://a0.muscache.com/4ea/air/v2/pictures/746ce656-ed8d-4966-8fcb-e8c1ce4f39d7.jpg?t=r:w1200-h720-sfit,e:fjpg-c90",
        alt: "Verified - Menaggio image"
      },
      info: "Verified - Menaggio",
      title: "Romantic, Lakeside Home with Views of Lake Como",
      price: 211,
      rating: "4.85",
      bookCount: 233
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/cd17b75f-9aee-4f68-b80d-dde84996fb4b.jpg?aki_policy=large",
        alt: "Entire house - Isla Mujeres image"
      },
      info: "Entire house - Isla Mujeres",
      title: "The World Famous Seashell House ~ Casa Caracol",
      price: 395,
      rating: "4.76",
      bookCount: 247
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/15273358/d7329e9a_original.jpg?aki_policy=large",
        alt: "Entire house - Ostuni image"
      },
      info: "Entire house - Ostuni",
      title: "I SETTE CONI - TRULLO EDERA ",
      price: 102,
      rating: "4.93",
      bookCount: 193
    }
  ];

  res.render("rooms", { rooms });
});

const PORT = process.env.PORT || 3000;

const DBURL =
  "mongodb+srv://tamtran:ptttran%40myseneca.ca@web322-airbnb-xcvfi.mongodb.net/test?retryWrites=true&w=majority";
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
