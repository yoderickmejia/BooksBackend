import moongose from 'mongoose';


const ReviewSchema = new moongose.Schema({  

    bookId: {
        type: String,
        required: [true, "please enter the bookId"]
    },
    userId: {
        type: String,
        required: [true, "please enter the userId"]
    },
    rating: {
        type: Number,
        required: [true, "please enter the rating"]
    },
    comment: {
        type: String,
        required: [true, "please enter the comments"]
    },
    created_At: {
        type: Date,
        default: Date.now
    },
}); 


export const  Reviews  =  moongose.model( "review" , ReviewSchema)