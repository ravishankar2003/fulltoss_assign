import User from "../models/User.js";  // Import User model
import bcryptjs from 'bcryptjs';  // Import bcryptjs for password hashing
import { errorHandler } from "../utils/error.js";  // Import custom error handler
import jwt from 'jsonwebtoken';  // Import JWT for token generation

// Signup function
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !password || !email || name === '' || password === '' || email === '') {
        return next(errorHandler(400, 'All fields are required'));  // Validate required fields
    }

    try {
        const userExists = await User.findOne({ email });  // Check if user already exists

        if (userExists) {
            return next(errorHandler(400, 'User already exists'));  // Handle existing user
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);  // Hash the password

        const int = Math.floor(Math.random() * 3);  // Randomly select IPL team
        const arr = ['MI', 'CSK', 'RCB'];  // List of IPL teams
        const user = new User({
            name,
            email,
            password: hashedPassword,
            ipl: arr[int]  // Assign random IPL team to the user
        });

        await user.save();  // Save user to the database

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = user._doc;  // Exclude password from response

        return res.status(201).json({ ...rest, "token": token });  // Return user data with token

    } catch (error) {
        next(error);  // Handle any errors
    }
};

// Signin function
const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!password || !email || password === '' || email === '') {
        return next(errorHandler(400, 'All fields are required'));  // Validate required fields
    }

    try {
        const userin = await User.findOne({ email });  // Check if user exists

        if (!userin) {
            return next(errorHandler(404, 'Invalid credentials'));  // Handle invalid credentials
        }

        const validPassword = bcryptjs.compareSync(password, userin.password);  // Compare password

        if (!validPassword) {
            return next(errorHandler(400, 'Invalid credentials'));  // Handle invalid credentials
        }

        const token = jwt.sign({ id: userin._id }, process.env.JWT_SECRET);  // Generate JWT token

        const { password: pass, ...rest } = userin._doc;  // Exclude password from response

        return res.status(200).json({ ...rest, "token": token });  // Return user data with token

    } catch (error) {
        next(error);  // Handle any errors
    }
};

// Get user details function
const getdetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);  // Fetch user by ID

        if (!user) {
            return next(errorHandler(404, 'User not found'));  // Handle user not found
        }

        const { password: pass, ...rest } = user._doc;  // Exclude password from response
        return res.status(200).json(rest);  // Return user details

    } catch (error) {
        next(error);  // Handle any errors
    }
};

// Update user details function
const update = async (req, res, next) => {
    try {
        const { name, email, password, ipl } = req.body;
        
        // Validate required fields
        if (!name || !email || !ipl || name === '' || email === '' || ipl === '' || password === '' || password === undefined) {
            return next(errorHandler(400, 'All fields are required'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);  // Hash the password
        req.body.password = hashedPassword;  // Update the password field

        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });  // Update user in database

        if (!user) {
            return next(errorHandler(404, 'User not found'));  // Handle user not found
        }

        const { password: pass, ...rest } = user._doc;  // Exclude password from response
        return res.status(200).json(rest);  // Return updated user details

    } catch (error) {
        next(error);  // Handle any errors
    }
}

export { signup, signin, getdetails, update };  // Export the functions
