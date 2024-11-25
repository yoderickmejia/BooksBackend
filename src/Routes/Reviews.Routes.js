import { Router } from "express";
import { postReviews,getReviews } from "../Controllers/Reviews.Controllers.js";

const ReviewsRouter = Router();


ReviewsRouter.get('/all/:userId', getReviews) // get all reviews
ReviewsRouter.post('/new', postReviews) // create a new review

export default ReviewsRouter;