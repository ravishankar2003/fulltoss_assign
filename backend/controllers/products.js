import { errorHandler } from "../utils/error.js";  // Import custom error handler
import User from "../models/User.js";  // Import User model
import Cart from "../models/Cart.js";  // Import Cart model
import data from "../dummydata.js";  // Import dummy data

// Get products based on user's IPL team
const getProducts = async (req, res, next) => {
    try {
        const userin = await User.findById(req.user.id);  // Fetch user by ID
        if (!userin) {
            return next(errorHandler(404, 'User not found'));  // Handle user not found
        }

        const filteredData = data.filter((item) => item.team === userin.ipl);  // Filter data based on user's IPL team

        return res.status(200).send(filteredData[0]);  // Return filtered product data
    } catch (error) {
        next(error);  // Handle errors
    }
}

// Add product to the user's cart
const addToCart = async (req, res, next) => {
    try {
        const userin = await User.findById(req.user.id);  // Fetch user by ID
        if (!userin) {
            return next(errorHandler(404, 'User not found'));  // Handle user not found
        }

        const product = req.body;  // Get product from request body
        let cart = await Cart.findOneAndUpdate({ user: req.user.id }, {
            $push: {
                products: product  // Add product to the cart
            }
        }, { new: true });

        if (!cart) {  // If no cart exists, create a new one
            const newCart = new Cart({
                user: req.user.id,
                products: [product]  // Initialize cart with the product
            });
            await newCart.save();
        }
        cart = await Cart.findOne({ user: req.user.id });  // Fetch the updated cart
        res.status(200).json({ user: req.user.id, products: cart.products });  // Return updated cart

    } catch (error) {
        next(error);  // Handle errors
    }
}

// Delete product from the user's cart
const deletefromCart = async (req, res, next) => {
    try {
        const userin = await User.findById(req.user.id);  // Fetch user by ID
        if (!userin) {
            return next(errorHandler(404, 'User not found'));  // Handle user not found
        }
        const product = req.body;  // Get product from request body
        const cart = await Cart.findOneAndUpdate({ user: req.user.id }, {
            $pull: {
                products: product  // Remove product from the cart
            }
        }, { new: true });

        res.status(200).json({ user: req.user.id, products: cart.products });  // Return updated cart
    } catch (error) {
        next(error);  // Handle errors
    }
}

// Get the current user's cart
const getCart = async (req, res, next) => {
    try {
        const userin = await User.findById(req.user.id);  // Fetch user by ID
        if (!userin) {
            return next(errorHandler(404, 'User not found'));  // Handle user not found
        }
        const cart = await Cart.findOne({ user: req.user.id });  // Fetch user's cart
        res.status(200).json({ user: req.user.id, products: cart ? cart.products : [] });  // Return cart contents
    } catch (error) {
        next(error);  // Handle errors
    }
}

export { getProducts, addToCart, deletefromCart, getCart };  // Export functions
