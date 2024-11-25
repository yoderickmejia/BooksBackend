import { User } from '../Models/User.Models.js';
import hash from '../utils/hash.js';
import jwt from 'jsonwebtoken';



// create a new user
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        const existingUser = await User.findOne({ email});
        if (!existingUser) {
            
            const user = await User.create({
                username,
                email,
                password: hash(password)
            });
            res.status(200).json(user);
        }

        else{
            res.status(400).json({ message: "Email already exists" });
        }

       

      
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login user
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password: hash(password)
        });

        if (user) {
            const token = jwt.sign(
                { _id: user._id, username: user.username },
                process.env.AUTH_SECRET,
                
            );

            res.status(200).json({ user, token });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};