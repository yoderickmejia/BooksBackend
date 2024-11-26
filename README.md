Documentación de la API del Proyecto
Descripción del Proyecto
Este proyecto es una aplicación de gestión de libros que permite a los usuarios buscar, agregar, editar y eliminar libros. La aplicación también permite a los usuarios marcar libros como favoritos y agregar reseñas.

Dependencias Instaladas
Backend (Node.js con Express y Mongoose)
express: Framework web para Node.js.
mongoose: ODM (Object Data Modeling) para MongoDB y Node.js.
bcrypt: Biblioteca para encriptar contraseñas.
jsonwebtoken: Biblioteca para generar y verificar tokens JWT.
cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
dotenv: Biblioteca para cargar variables de entorno desde un archivo .env.
axios: Cliente HTTP para realizar solicitudes HTTP.


Archivo principal de API

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


Rutas de la API
Usuarios
POST /api/v1/user/register:  Registra un nuevo usuario.
POST /api/v1/user/login: Inicia sesión y devuelve un token JWT.
Libros
GET /api/v1/books/all  : Obtiene todos los libros.
GET /api/v1/books/by-id/:id : Obtiene un libro por su ID.
POST /api/v1/books/new: : Crea un nuevo libro.
PUT /api/v1/books/update/:id  : Actualiza un libro por su ID.
DELETE /api/v1/books/delete/:id : Elimina un libro por su ID.
PUT /api/v1/books/favorite/:id  : Marca un libro como favorito.
GET /api/v1/books/search : Busca libros por su nombre.
GET /api/v1/books/advancedSearch : Busca libros con filtros avanzados.
GET /api/v1/books/categories : Busca libros con filtros avanzados.

Reseñas
GET /api/v1/reviews/all: Obtiene todas las reseñas.
POST /api/v1/reviews/new: Agrega una nueva reseña a un libro.

Controladores

Controladores de Usuarios

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

Controladores de Libros


export const getBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, year, genre, coverImage, rating, userId } = req.body;
    const book = await Books.create({ title, author, year, genre, coverImage, rating, userId });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.isFavorite = !book.isFavorite;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { userId, title, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filters = { userId };
    if (title) {
      filters.title = new RegExp(title, 'i');
    }
    const books = await Books.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

Controladores de Reseñas

export const addReview = async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;
    const review = await Reviews.create({ bookId, userId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ message: "userId is required." });
        }

        const reviews = await Reviews.find({ userId });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user." });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


Modelos de Mongo DB

Modelo de Usuario

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});



Modelo de Libro

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: [String], required: true },
  coverImage: { type: String, required: true },
  rating: { type: Number, required: true },
  isFavorite: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

Modelo de Reseña

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});


Encrytamiento de contraseña

export default function hash(data) {
  return crypto.createHash('sha256').update(data).digest('base64');
}

Conexion a la base de datos
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
        

Configuración de Variables de Entorno

PORT= 3000
DB_CONNECTION=mongodb+srv://Yoderick:24071222@cluster0.reidm.mongodb.net/DBLibrary
AUTH_SECRET=123456789


Estructura del Proyecto

/project-root
|-- /server
|   |-- /src
|   |   |-- /controllers
|   |   |   |-- User.Controller.js
|   |   |   |-- Books.Controllers.js
|   |   |   |-- Reviews.Controllers.js
|   |   |   |-- Images.Controllers.js
|   |   |-- /models
|   |   |   |-- User.Models.js
|   |   |   |-- Reviews.Models.js
|   |   |   |-- Books.Models.js
|   |   |-- /routes
|   |   |   |-- Users.Routes.js
|   |   |   |-- Books.Routes.js
|   |   |   |-- Reviews.Routes.js
|   |   |-- /services
|   |   |   |-- database.js
|   |   |-- /utils
|   |   |   |-- hash.js
|-- .env
|-- package.json





