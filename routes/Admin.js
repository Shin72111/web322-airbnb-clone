const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getAddRoom,
  postAddRoom
} = require("../controllers/Admin");

router.get("/dashboard", getDashboard);
router.get("/add", getAddRoom);
router.post("/add", postAddRoom);

module.exports = router;
