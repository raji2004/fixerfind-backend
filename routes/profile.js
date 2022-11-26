const express = require("express");
const { getprofile,changeprofile} = require("../controllers/profile");
const router = express.Router();

router.get("/profile", getprofile);
router.post("/profile", changeprofile);


module.exports = router;