import mongoose from "mongoose";

export const databaseConnect = (DB_CONNECTION) => {
    try
    {
        mongoose
        .connect(
            DB_CONNECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        .then(() => {   
            console.log("connected to database");
        })
        
    }
 
    catch (error) {
        console.error("error connecting to database", error.message);
    }

}
        
