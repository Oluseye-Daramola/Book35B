const express = require("express");

const router = express.Router();

const { createService, getServices, updateService, deleteService } = require("../Controllers/serviceController");

const { validateCreateService, validateUpdateService } = require("../Validations/serviceValidation");

const { protect } = require("../Middleware/auth");











router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Service route is working"
    });
});







router.post("/", protect, validateCreateService, createService);



router.get("/", protect, getServices);


router.put("/:id", protect, validateUpdateService, updateService);


router.delete("/:id", protect, deleteService);











module.exports = router;