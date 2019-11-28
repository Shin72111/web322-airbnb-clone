const express = require("express");
const router = express.Router();

const { getDashboard, getAddRoom } = require("../controllers/Admin");

router.get("/dashboard", getDashboard);
router.get("/add", getAddRoom);

module.exports = router;
