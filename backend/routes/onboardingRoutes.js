const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    saveOnboarding
} = require("../controllers/onboardingController");


router.post(
    "/",
    protect,
    saveOnboarding
);


module.exports = router;