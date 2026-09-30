const express = require("express");
const router = express.Router();

const { register, login } = require("../Controllers/authController");
const { registerSchema, loginSchema } = require("../Validations/authValidation");
const { validate } = require("../Middleware/validate");

router.get("/test", (req, res) => {
  res.json({ success: true, message: "Auth route is working" });
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;