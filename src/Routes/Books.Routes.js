import { Router } from "express";
import { getBooks , createBook , updateBook, deleteBook,
    findBookByTitle , findBookById, MarkAsFavorite, AvancedFilters , Categories
} from "../Controllers/Books.Controllers.js";

const BookRouter = Router();

BookRouter.get('/all', getBooks);  // get all books

BookRouter.post('/new', createBook); // create a new book

BookRouter.put('/update/:id', updateBook) // update a book

BookRouter.delete('/delete/:id', deleteBook);  // delete a book

BookRouter.get('/search',findBookByTitle ); // search a book by title   


BookRouter.get('/by-id/:id',findBookById); // search a book by id

BookRouter.put('/favorite/:id',MarkAsFavorite); //  mark a book as favorite

BookRouter.get('/advancedSearch',AvancedFilters);

BookRouter.get('/categories',Categories);


export default BookRouter;