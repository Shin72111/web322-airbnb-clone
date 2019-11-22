const express = require("express");
const router = express.Router();

const { getHomePage, getRoom } = require("../controllers/General");

router.get("/", getHomePage);

router.get("/rooms", getRoom);

module.exports = router;
