import  { Router } from "express";
import UserRouter from "./Users.Routes.js";
import BookRouter from "./Books.Routes.js";
import ReviewsRouter from "./Reviews.Routes.js";
import ImagesRouter from "./Images.Routes.js";

const router = Router();

const prefix = '/api/v1';   

router.get(`${prefix}/`, (_req, res) => {

    res.send('Welcome to the API');
});

router.use(`${prefix}/user`, UserRouter)

router.use(`${prefix}/books`, BookRouter) 
router.use(`${prefix}/reviews`, ReviewsRouter)
router.use(`${prefix}/Images`, ImagesRouter) 


export default router;
