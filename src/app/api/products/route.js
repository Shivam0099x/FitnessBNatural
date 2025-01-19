import connectToDatabase from "@/app/lib/connection"
import Product from "@/app/models/product"



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


export async function POST(req){
    await connectToDatabase()
    try {
        const body = await req.json()
        const {title,description,price,image,weight} = body

        if(!title || !description || !price || !image || !weight){
            return Response.json({
                status: 500,
                message: "All fields are required"
            })
        }

        const product = await Product.create({title,description,price,image,weight})

        if(!product){
            return Response.json({
                status: 500,
                message: "Error while creating product!"
            })
        }

        return Response.json({
            status: 200,
            message: "Product created successfully!",
            product
        })

    
    }
    catch (error) {
        return Response.json({
            status: 500,
            message: "Error while creating products! " + error
        })
    }
}