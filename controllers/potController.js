const Product = require("../models/product");

// Create a new pot product
exports.createPot = async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: "Image file is required" });
    }
    try {
        req.body.img = `uploads/${req.file.filename}`;
        const newPot = new Product({ ...req.body, category: "Pot" });
        const savedPot = await newPot.save();
        res.status(201).json(savedPot);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create pot" });
    }
};

// Get all pots (with optional pagination)
exports.getAllPots = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;
        const filters = { category: "Pot" };
        const { size,title,pricegt,pricelt } = req.query;

        if (size) filters.size = size;
        if (title) filters.title = { $regex: title, $options: "i" };
        filters.price = { $lt: pricelt || 1000, $gt: pricegt || 0 };

        const totalCount = await Product.countDocuments({ category: "Pot" });
        const pots = await Product.find(filters).skip(skip).limit(limit);
        
        console.log(pots)
        res.status(200).json({
            products: pots,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch pots" });
    }
};

// Get single pot by ID
exports.getPotById = async (req, res) => {
    try {
        const pot = await Product.findById(req.params.id);
        if (!pot) return res.status(404).json({ error: "Pot not found" });
        res.status(200).json(pot);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pot" });
    }
};

// Update pot by ID
exports.updatePot = async (req, res) => {
    try {
        if(req.file) {
            req.body = {
                ...req.body,
                img: `uploads/${req.file.filename}`
            }
        }
        const updatedPot = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPot) return res.status(404).json({ error: "Pot not found" });
        res.status(200).json(updatedPot);
    } catch (error) {
        res.status(500).json({ error: "Failed to update pot" });
    }
};

// Delete pot by ID
exports.deletePot = async (req, res) => {
    try {
        const deletedPot = await Product.findByIdAndDelete(req.params.id);
        if (!deletedPot) return res.status(404).json({ error: "Pot not found" });
        res.status(200).json({ message: "Pot deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete pot" });
    }
};
