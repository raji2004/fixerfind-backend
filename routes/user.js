const express = require("express");
const { register,validate,login,forgotpassword, resetpassword, deleted} = require("../controllers/user");
const router = express.Router();

router.post("/register", register);
router.put("/validate", validate);
router.post("/login", login);
router.post("/forgotpassword",forgotpassword)
router.put("/resetpassword",resetpassword)
router.put("/delete",deleted)

module.exports = router;
