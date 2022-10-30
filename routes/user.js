const express = require("express");
const { register,validate } = require("../controllers/user");
const router = express.Router();

router.post("/register", register);
router.post("/validate", validate);

module.exports = router;
