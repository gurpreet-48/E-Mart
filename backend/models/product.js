const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'please enter the product name'],
        trim: true,
        maxlength:[100,'Product name cannot exceed 100 character']
    },
    price: {
        type:Number,
        required: [true, 'please enter the price'],
        maxlength:[5,'Product price cannot exceed 5 characters'],
        default:0.0
        
    },
    description: {
        type:String,
        required: [true, 'please enter the product description']
        
    },
    ratings: {
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type :String,
                required: true
            },
            url:{
                type :String,
                required: true
            },
        }
    ], 
    category:{
        type:String,
        required:[true, 'please enter category for this product'],
        enum: {
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Homes'
            ],
            message: 'Please select correct cotegory for products'
        }
    },
    seller: {
        type:String,
        required:[true, 'please enter seller for this product'],
    },
    stocks: {
        type:Number,
        required:[true, 'please enter product stock'],
        maxlength:[5,'Product name cannot exceed 5 characters'],
        default : 0
    },
    numOfReviews: {
        type:Number,
        default:0
    },
    reviews: [{
        user: {
            type:mongoose.Schema.ObjectId,
            ref: 'User',
            required:true
    
        },
        name: {
            type:String,
            default:0
        },
        rating: {
            type:Number,
            default:0
        },
        comment: {
            type:String,
            default:""
        },
        

    }],

    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true

    },
    createdAt: {
        type:Date,
        default:Date.now
    }
        
    

}) 
module.exports = mongoose.model('Product',productSchema)
