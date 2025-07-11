const Plate = require("../models/plate");

// Get all plates (with optional query filters)
exports.getAllPlates = async (req, res) => {
    try {
        const filters = {};
        const { size, title ,page, limit,price} = req.query;

        if (size) filters.size = size;
        if (title) filters.title = { $regex: title, $options: "i" };
        if (price) filters.price = { $lt: price};

        const products = await Plate.find(filters).skip((page-1)*limit).limit(limit);
        const totalPages = await Plate.countDocuments();
        res.status(200).json(
             {
                 products,
                 totalPages
             }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch plates", error: err });
    }
};

// Get single plate by productId
exports.getPlateById = async (req, res) => {
    try {
        const plate = await Plate.findOne({ productId: req.params.id });
        if (!plate) return res.status(404).json({ message: "Plate not found" });

        res.status(200).json(plate);
    } catch (err) {
        res.status(500).json({ message: "Error fetching plate", error: err });
    }
};

// Create a plate
exports.createPlate = async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: "Image file is required" });
    }
    try {
        req.body.img = `uploads/${req.file.filename}`;
        const newPlate = new Plate(req.body);
        await newPlate.save();
        res.status(201).json(newPlate);
    } catch (err) {
        res.status(500).json({ message: "Failed to create plate", error: err });
    }
};

// Update a plate
exports.updatePlate = async (req, res) => {
    try {
        const updated = await Plate.findOneAndUpdate(
            { productId: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Plate not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update plate", error: err });
    }
};

// Delete a plate
exports.deletePlate = async (req, res) => {
    try {
        const deleted = await Plate.findOneAndDelete({ productId: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Plate not found" });

        res.status(200).json({ message: "Plate deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete plate", error: err });
    }
};
