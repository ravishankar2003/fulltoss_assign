import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true,
    },
    products: [{
        id : {
            type : Number,
            required : true,
            unique : true,
        },
        name : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required : true,
        },
        imageURL : {
            type : String,
            required : true,
        },
    }
    ]
});

const Cart = mongoose.model('fulltossCart', cartSchema);

export default Cart;
