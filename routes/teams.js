const express = require("express");
const router = express.Router();
const controller = require("../controllers/team/index");
const api = require("../controllers/api/index");

router.post("/createteam", controller.createteam);

//api controller

router.get("/recruit", api.recruit);
module.exports = router;
