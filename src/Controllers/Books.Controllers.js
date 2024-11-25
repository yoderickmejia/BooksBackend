import { Books } from '../Models/Books.Models.js';

// Obtener libros con paginación
export const getBooks = async (req, res) => {
    try {
       
        const { page, userId  } = req.query;
        const limit = 10;
        const skip = (page - 1) * limit;

        if (!userId) {
            return res.status(400).json({ message: "userId is required." });
        }

        const books = await Books.find({ userId })
            .skip(skip)
            .limit(limit)
            .sort({ created_At: 1 });

        if (books.length >1 ){
            return res.status(200).json(books);
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books. Please try again later." });
    }
};

// Crear un nuevo libro
export const createBook = async (req, res) => {
    try {
        const { title, author, year, genre, coverImage, rating, isFavorite, userId } = req.body;
        console.log(genre); 
    

        const book = await Books.create({ title, author, year, genre, coverImage, rating, isFavorite, userId });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un libro existente
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findByIdAndUpdate(id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un libro
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar libros por título
export const findBookByTitle = async (req, res) => {
    try {
        const { title ="", page = 1, userId } = req.query;
        
        const limit = 10;
        const skip = (page - 1) * limit;

        let books = await Books.find({
            title: { $regex: title, $options: 'i' },
            userId: userId
        }).skip(skip).limit(limit).sort({ created_At: 1 });

        if (title.length === 0) {
            books = await Books.find({ userId }).skip(skip).limit(limit).sort({ created_At: 1 });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar libro por ID
export const findBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Marcar libro como favorito
export const MarkAsFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required." });
        }

        const book = await Books.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        book.isFavorite = !book.isFavorite;
        await book.save();

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filtros avanzados para buscar libros
export const AvancedFilters = async (req, res) => {
    try {
        const { author, year, genre, page = 1, userId } = req.query;
           
        const limit = 10;
        const skip = (page - 1) * limit;

        const filters = { userId };
        if (author) {
            filters.author = new RegExp(author, 'i');
        }
        if (year && year !== '0') {
            filters.year = year;
        }
        if (genre) {
            filters.genre = { $in: genre.split(',') };
        }
        if (genre) {
            filters.genre = { $elemMatch: { $eq: genre } };
        }

        const books = await Books.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};


export const Categories = async (req, res) => {
    try {
        const { genre, page = 1, userId } = req.query;
           
        const limit = 10;
        const skip = (page - 1) * limit;

        const filters = { userId };
        
        
        if (genre) {
            filters.genre = { $elemMatch: { $eq: genre } };
        }

        const books = await Books.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};