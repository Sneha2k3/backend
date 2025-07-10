const Review = require('../models/review');
const User = require('../models/user');

exports.getAllReviews = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const totalCount = await Review.countDocuments();
        const reviews = await Review.find().sort({createdAt : -1}).skip((page-1)*limit).limit(limit);
        
        let reviewsUpdated = []
        for(review of reviews){
                const userID = await User.findById(review.userID);
                //console.log(review)
                //console.log(userID); 
                const updated = {
                    ...review._doc,userID
                }
                console.log(updated);
                reviewsUpdated.push(updated);
        }
        res.status(200).json({ 
            totalPages : totalCount,
            reviews : reviewsUpdated 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch reviews", error: err });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findOne({ productId: req.params.id });
        if (!review) return res.status(404).json({ message: "Review not found" });

        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: "Error fetching review", error: err });
    }
};

exports.createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        console.log(newReview);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create review", error: err });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const updated = await Review.findOneAndUpdate(
            { productId: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Review not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update review", error: err });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Review.findOneAndDelete({ productId: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Review not found" });

        res.status(200).json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete review", error: err });
    }
};
