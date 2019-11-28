const Room = require("../models/Room");
const { isNullInputField, isImage } = require("../utils/validators");
const uuidv1 = require("uuid/v1");
const path = require("path");

exports.getDashboard = (req, res) => {
  res.render("Admin/dashboard");
};

exports.getAddRoom = (req, res) => {
  res.render("Admin/addRoom");
};

exports.postAddRoom = (req, res) => {
  const errors = {};

  if (isNullInputField(req.body.title)) {
    errors.titleError = "Title is required";
  }

  if (isNullInputField(req.body.price)) {
    errors.priceError = "Price is required";
  } else if (isNaN(req.body.price)) {
    errors.priceError = "Price must be a number";
  }

  if (isNullInputField(req.body.city) || req.body.city === "Select city") {
    errors.cityError = "City is required";
  }

  if (isNullInputField(req.body.description)) {
    errors.descriptionError = "Description is required";
  }

  if (isNullInputField(req.files)) {
    errors.fileError = "Image is required";
  } else if (!isImage(req.files.file)) {
    errors.fileError = "The file needs to be image type";
  }

  if (Object.keys(errors).length > 0) {
    res.render("Admin/addRoom", { ...errors, ...req.body });
  } else {
    const formData = {
      title: req.body.title,
      price: req.body.price,
      city: req.body.city,
      description: req.body.description,
      image: `room-${uuidv1()}${path.parse(req.files.file.name).ext}`
    };
    req.files.file
      .mv(`public/rooms/${formData.image}`)
      .then(() => {
        const room = new Room(formData);
        room.save();
      })
      .then(room => {
        res.redirect(`/rooms/${room._id}`);
      })
      .catch(err => {
        console.log(`Something went wrong:\n${err}`);
        res.render("Admin/addRoom", {
          error: "Something went wrong internally",
          ...req.body
        });
      });
  }
};
