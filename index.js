const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


const authRoutes = require("./routes/authRoutes"); // adjust path if needed
const potRoutes = require("./routes/potRoutes");
const plateRoutes = require("./routes/plateRoutes");
const mugRoutes = require("./routes/mugRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 


app.use("/api/auth", authRoutes);
app.use("/api/pots", potRoutes);
app.use("/api/plates", plateRoutes);
app.use("/api/mugs", mugRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/custom", paymentRoutes);



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(4000, () => console.log("Server running on port 4000"));
    })
    .catch((err) => console.error("Mongo Error:", err));




//================Forget password==================
const passwordRoutes = require("./routes/passwordRoutes");
app.use("/api/password", passwordRoutes);



//=================products==================

const Product = require("./models/product");

// Get all pots (with optional query filters)
exports.getAllPots = async (req, res) => {
    try {
        const filters = {};
        const { size, stock, title } = req.query;

        if (size) filters.size = size;
        if (title) filters.title = { $regex: title, $options: "i" };

        const pots = await Pot.find(filters);
        res.status(200).json(pots);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch pots", error: err });
    }
};

// Get single pot by productId
exports.getPotById = async (req, res) => {
    try {
        const pot = await Pot.findOne({ productId: req.params.id });
        if (!pot) return res.status(404).json({ message: "Pot not found" });

        res.status(200).json(pot);
    } catch (err) {
        res.status(500).json({ message: "Error fetching pot", error: err });
    }
};

// Create a pot
exports.createPot = async (req, res) => {
    try {
        const newPot = new Pot(req.body);
        await newPot.save();
        res.status(201).json(newPot);
    } catch (err) {
        res.status(500).json({ message: "Failed to create pot", error: err });
    }
};

// Update a pot
exports.updatePot = async (req, res) => {
    try {
        const updated = await Pot.findOneAndUpdate(
            { productId: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Pot not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update pot", error: err });
    }
};

// Delete a pot
exports.deletePot = async (req, res) => {
    try {
        const deleted = await Pot.findOneAndDelete({ productId: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Pot not found" });

        res.status(200).json({ message: "Pot deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete pot", error: err });
    }
};

