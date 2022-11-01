const express = require("express");
const { register,validate,login } = require("../controllers/user");
const router = express.Router();

router.post("/register", register);
router.post("/validate", validate);
router.post("/login", login);

module.exports = router;
