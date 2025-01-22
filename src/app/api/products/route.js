import connectToDatabase from "@/app/lib/connection"
import Product from "@/app/models/product"
import { v2 as cloudinary } from 'cloudinary';


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    await connectToDatabase();
    try {
        const body = await req.json();
        const { title, description, price, images, weight } = body;

        // Validate fields
        if (!title || !description || !price || !images || !weight) {
            return Response.json({
                status: 500,
                message: "All fields are required",
            });
        }

        // Validate images array
        if (!Array.isArray(images) || images.length < 5) {
            return Response.json({
                status: 500,
                message: "A minimum of 5 images is required",
            });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(image, {
                        folder: 'product_images', // Optional: Cloudinary folder name
                    });
                    return uploadResponse.secure_url; // Get the secure URL of the uploaded image
                } catch (error) {
                    console.error("Error uploading image:", error);
                    throw new Error("Failed to upload image to Cloudinary");
                }
            })
        );

        // Create product in the database
        const product = await Product.create({
            title,
            description,
            price,
            images: uploadedImages, // Save Cloudinary URLs
            weight,
        });

        if (!product) {
            return Response.json({
                status: 500,
                message: "Error while creating product!",
            });
        }

        return Response.json({
            status: 200,
            message: "Product created successfully!",
            product,
        });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({
            status: 500,
            message: "Error while creating product! " + error.message,
        });
    }
}



export async function GET(){
    await connectToDatabase()
    try {
        const products = await Product.find({})
        if(!products){
            return Response.json({
                message: "No products found!"
            })
        }

        return Response.json({
            message: "All Product fetched Successfully!",
            data: products
        })
    }
    catch (error) {
        return Response.json({
            status: 500,
            message: "Error while fetching products! " + error
        })
    }
}


// export async function POST(req) {
//     await connectToDatabase();
//     try {
//         const body = await req.json();
//         console.log(body);
//         const { title, description, price, images, weight } = body;


//         if (!title || !description || !price || !images || !weight) {
//             return Response.json({
//                 status: 500,
//                 message: "All fields are required"
//             });
//         }

//         if (!Array.isArray(images) || images.length < 5) {
//             return Response.json({
//                 status: 500,
//                 message: "A minimum of 5 images is required"
//             });
//         }

//         const product = await Product.create({ title, description, price, images, weight });

//         if (!product) {
//             return Response.json({
//                 status: 500,
//                 message: "Error while creating product!"
//             });
//         }

//         return Response.json({
//             status: 200,
//             message: "Product created successfully!",
//             product
//         });

//     } catch (error) {
//         return Response.json({
//             status: 500,
//             message: "Error while creating product! " + error
//         });
//     }
// }