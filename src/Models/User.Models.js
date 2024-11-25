import moongose from 'mongoose';    


const UserSchema = new moongose.Schema({
        
    username: {
        type: String,
        required: [true,"please enter the username"]
    },
    email: {
        type: String,
        required: [true , "please enter the email"] 
    },
    password: {
        type: String,
        required: [true, "please enter the password"]   
    },
    created_at: {
        type: Date,
        default: Date.now 
    }
});

export const User  =  moongose.model('Users', UserSchema);