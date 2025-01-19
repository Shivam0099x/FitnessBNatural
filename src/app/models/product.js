import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Product = mongoose.models.Product || mongoose.model('Product',productSchema);

export default Product;