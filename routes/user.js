const express = require("express");
const { register,validate,login,forgotpassword, resetpassword} = require("../controllers/user");
const router = express.Router();

router.post("/register", register);
router.post("/validate", validate);
router.post("/login", login);
router.post("/forgotpassword",forgotpassword)
router.post("/resetpassword",resetpassword)

module.exports = router;
