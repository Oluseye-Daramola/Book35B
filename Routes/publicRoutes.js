const express = require("express");

const router = express.Router();

const { getPublicProviderProfile, getPublicProviderServices, createAppointment } = require("../Controllers/publicController");
const { validate } = require("../Middleware/validate");
const { createAppointmentSchema } = require("../Validations/appointmentValidation");


router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Public route is working"
    });
});

router.get("/providers/:slug", getPublicProviderProfile);

router.get("/providers/:slug/services", getPublicProviderServices);

router.post("/appointments", validate(createAppointmentSchema), createAppointment);

module.exports = router;