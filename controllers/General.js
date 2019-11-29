const Room = require("../models/Room");

exports.getHomePage = (req, res) => {
  res.render("General/home");
};

exports.getRoom = (req, res) => {
  const query = {};
  if (req.query.city) {
    query.city = req.query.city;
  }
  Room.find(query)
    .then(rooms => {
      res.render("General/rooms", { rooms });
    })
    .catch(err => {
      console.log(`Something went wrong:\n${err}`);
      res.redirect("/");
    });
};
