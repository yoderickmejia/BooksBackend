import { Router } from "express";
import { upload} from '../Controllers/Images.controllers.js';
const ImagesRouter = Router();  



ImagesRouter.post('/upload', upload.single('image')); // upload a new image



export default ImagesRouter;     