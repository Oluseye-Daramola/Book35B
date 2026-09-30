const express = require("express");

const router = express.Router();

const { createAvailability, getAvailability, updateAvailability, deleteAvailability } = require("../Controllers/availabilityController");

const { validateCreateAvailability, validateUpdateAvailability } = require("../Validations/availabilityValidation");

const { authenticate } = require("../Middleware/auth");









router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Availability route is working"
    });
});



router.post("/", authenticate, validateCreateAvailability, createAvailability);

router.put("/:id", authenticate, validateUpdateAvailability, updateAvailability);

router.get("/", authenticate, getAvailability);

router.delete("/:id", authenticate, deleteAvailability);









module.exports = router;