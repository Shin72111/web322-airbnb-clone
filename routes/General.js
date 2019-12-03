const express = require("express");
const router = express.Router();

const {
  getHomePage,
  getRoom,
  getSingleRoom
} = require("../controllers/General");

router.get("/", getHomePage);

router.get("/rooms", getRoom);

router.get("/room/:id", getSingleRoom);

module.exports = router;
