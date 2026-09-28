const express = require("express");

const router = express.Router();

const { getPublicProviderProfile, getPublicProviderServices } = require("../Controllers/publicController");






router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Public route is working"
    });
});



router.get("/providers/:slug", getPublicProviderProfile);


router.get("/providers/:slug/services", getPublicProviderServices);








module.exports = router;