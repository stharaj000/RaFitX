const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        //Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }


        //Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists!"
            });
        }


        // console.log(req.body);

        //Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        //Validating Input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password are required!"
            })
        }

        //Find user

        const user = await User.findOne({
            email
        });


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            })
        }

        //comparing Password

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            success: true,
            message: "Login sucessful!",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })

    }
}


const getProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
}


module.exports = {
    registerUser,
    loginUser,
    getProfile
};