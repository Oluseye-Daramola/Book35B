const express = require("express");

const router = express.Router();

const { register, login } = require("../Controllers/authController");

const { validateRegister, validateLogin } = require("../Validations/authValidation");







router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working"
    });
});


router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);



















module.exports = router;