const express = require("express");

const router = express.Router();

const { createAvailability, getAvailability, updateAvailability, deleteAvailability } = require("../Controllers/availabilityController");

const { validateCreateAvailability, validateUpdateAvailability } = require("../Validations/availabilityValidation");

const { protect } = require("../Middleware/auth");









router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Availability route is working"
    });
});



router.post("/", protect, validateCreateAvailability, createAvailability);

router.put("/:id", protect, validateUpdateAvailability, updateAvailability);

router.get("/", protect, getAvailability);

router.delete("/:id", protect, deleteAvailability);









module.exports = router;