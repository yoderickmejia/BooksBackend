import moongose from 'mongoose';


const BookSchema = new moongose.Schema({
    title: {
        type: String,
        required: [true, "please enter the title"]
    },
    author: {
        type: String,
        required: [true, "please enter the author"]
    },
    year: {
        type: String,
        required: [true, "please enter the year"]
    },
    genre: {
        type: [String],
        required: [true, "please enter the genre"]
    },
    coverImage: {
        type: String,
        required: [true, "please enter the cover"]
    },
    rating: {
        type: Number,
        required: [true, "please enter the rating"]
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: [true, "please enter the userId"]
    },
    created_At: {
        type: Date,
        default: Date.now
    },
    updated_At: {
        type: Date,
        default: Date.now
    }
});

export const Books = moongose.model('Books', BookSchema);