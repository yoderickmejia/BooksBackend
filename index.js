// imports
import express from 'express';
import dotenv from 'dotenv';    
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './src/Routes/Routes.js';    
import { databaseConnect } from "./src/Services/database.js";
const app = express();

//middleware  
dotenv.config();  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/', router);
//Port
const desiredPort = process.env.PORT || 88;
app.listen(desiredPort, () => {
    console.log(`server listening in port ${desiredPort}`);
});


//connect to database
databaseConnect(process.env.DB_CONNECTION);
