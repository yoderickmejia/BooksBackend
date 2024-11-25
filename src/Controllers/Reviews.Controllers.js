import { Reviews } from "../Models/Reviews.Models.js";


// Obtener reviews
export const getReviews = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Received params:", req.params);

        if (!userId) {
            return res.status(400).json({ message: "userId is required." });
        }

        const reviews = await Reviews.find({ userId });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user." });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// envio de reviews
export const postReviews = async (req, res) => {
    try {
        const { bookId, userId, rating, comment } = req.body;

        if (!bookId || !userId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const review = await Reviews.create({ bookId, userId, rating, comment });
        res.status(201).json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

