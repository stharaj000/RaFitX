const mongoose = require("mongoose");

const onboardingProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: true,
            enum: ["male", "female"]
        },

        age: {
            type: Number,
            required: true
        },

        height: {
            type: Number,
            required: true
        },

        currentWeight: {
            type: Number,
            required: true
        },

        goalWeight: {
            type: Number,
            required: true
        },

        goal: {
            type: String,
            required: true,
            enum: [
                "weight_loss",
                "maintain_weight",
                "weight_gain"
            ]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "OnboardingProfile",
    onboardingProfileSchema
);