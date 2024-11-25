import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../Client/public/Images')); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});




export const upload = multer({ storage });



