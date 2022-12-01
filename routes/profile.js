const express = require("express");
const { getprofile,changeprofile} = require("../controllers/profile");
const router = express.Router();

router.get("/profile", getprofile);
router.put("/profile", changeprofile);


module.exports = router;