import { Router } from "express";
import { createUser,Login  } from "../Controllers/User.Controller.js";

const  UserRouter = Router();    


UserRouter.post('/register', createUser ); //   create a new user

UserRouter.post('/login', Login ); // login a user


export default UserRouter;