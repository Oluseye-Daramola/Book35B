const express = require("express");

const router = express.Router();

const { getMe, updateMe } = require("../Controllers/providerController")

const { validateUpdateProvider } = require("../Validations/providerValidation");

const { protect } = require("../Middleware/auth");





router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Provider route is working"
    });
});



router.get("/me", protect, getMe);


router.put("/me", protect, validateUpdateProvider, updateMe);













module.exports = router;