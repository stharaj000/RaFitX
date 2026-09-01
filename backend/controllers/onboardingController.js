const OnboardingProfile = require("../models/OnboardingProfile");

const saveOnboarding = async (req, res) => {

    try {

        const {
            name,
            gender,
            age,
            height,
            currentWeight,
            goalWeight,
            goal
        } = req.body;

        // Validate data
        if (
            !name ||
            !gender ||
            !age ||
            !height ||
            !currentWeight ||
            !goalWeight ||
            !goal
        ) {
            return res.status(400).json({
                success: false,
                message: "All onboarding fields are required."
            });
        }

        // Get logged-in user's ID
        const userId = req.user._id;

        // Create onboarding profile
        const profile = await OnboardingProfile.findOneAndUpdate(
            { userId },
            {
                userId,
                name,
                gender,
                age,
                height,
                currentWeight,
                goalWeight,
                goal
            },
            {
                new: true,
                upsert: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Onboarding completed successfully.",
            profile
        });

    } catch (error) {

        console.error("Onboarding Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};

module.exports = {
    saveOnboarding
};