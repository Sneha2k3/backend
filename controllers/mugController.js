const Mug = require('../models/mug');

exports.getAllMugs = async (req, res) => {
    try {
        const filters = {};
        const { size, stock, title, page,limit ,price} = req.query;

        if (size) filters.size = size;
        if (title) filters.title = { $regex: title, $options: "i" };
        if (price) filters.price = { $lt: price};

        const mugs = await Mug.find(filters).skip((page-1)*limit).limit(limit); 
        const totalCount = await Mug.countDocuments();

        res.status(200).json( {
            products : mugs,
            totalPages : totalCount
        } );
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch mugs", error: err });
    }
};

exports.getMugById = async (req, res) => {
    try {
        const mug = await Mug.findOne({ productId: req.params.id });
        if (!mug) return res.status(404).json({ message: "Mug not found" });

        res.status(200).json(mug);
    } catch (err) {
        res.status(500).json({ message: "Error fetching mug", error: err });
    }
};

exports.createMug = async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: "Image file is required" });
    }
    try {
        req.body.img = `uploads/${req.file.filename}`;
        const newMug = new Mug(req.body);
        await newMug.save();
        res.status(201).json(newMug);
    } catch (err) {
        res.status(500).json({ message: "Failed to create mug", error: err });
    }
};

exports.updateMug = async (req, res) => {
    try {
        const updated = await Mug.findOneAndUpdate(
            { productId: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Mug not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update mug", error: err });
    }
};

exports.deleteMug = async (req, res) => {
    try {
        const deleted = await Mug.findOneAndDelete({ productId: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Mug not found" });

        res.status(200).json({ message: "Mug deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete mug", error: err });
    }
};
