const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes")

const onboardingRoutes = require("./routes/onboardingRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: [
        "http://127.0.0.1:3000",
         "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());


app.use("/api/auth", authRoutes);

app.use(
    "/api/onboarding",
    onboardingRoutes
);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to RaFitX API!"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT)
});