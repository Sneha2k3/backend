const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Assuming 'identifier' is email, change if necessary
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token (use your secret key, keep it safe)
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.fullName || user.name,
            },
            process.env.JWT_SECRET, // make sure this is set in your env variables
            { expiresIn: '1d' }
        );

        // Send the token and user info
        res.status(200).json({
            jwt: token,
            user: {
                id: user._id,
                name: user.fullName || user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


//==========Signup==================


exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: { message: "Email already exists" } });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user and set 'identifier' as email
        const newUser = new User({
            fullName,
            email,
            identifier: email, // ✅ Add this line to satisfy schema
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: { message: "Server error" } });
    }
};