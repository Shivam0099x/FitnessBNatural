import Product from "@/app/models/product";
import connectToDatabase from "@/app/lib/connection";

export async function GET(_, { params }) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return Response.json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }

    return Response.json({
      status: 200,
      success: true,
      message: `User found Successfully`,
      data: product,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      success: false,
      message: "Error while finding product by Id " + error,
    });
  }
}

export async function PUT(req, { params }) {
    await connectToDatabase();
     const { id } = await params;
     const body = await req.json();
     const { title, description, price, weight, image } = body;
  
    try {
      if (!title && !description && !price && !weight && !image) {
        return new Response(
          JSON.stringify({
            status: 400,
            success: false,
            message: "Please provide at least one field value to update",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const updatedFields = {};
      if (title) updatedFields.title = title;
      if (description) updatedFields.description = description;
      if (price) updatedFields.price = price;
      if (weight) updatedFields.weight = weight;
      if (image) updatedFields.image = image;

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
  
      if (!updatedProduct) {
        return new Response(
          JSON.stringify({
            status: 404,
            success: false,
            message: "Product not found",
          }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          status: 200,
          success: true,
          message: "Product updated successfully",
          data: updatedProduct,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          status: 500,
          success: false,
          message: "Error while updating product: " + error.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  

export async function DELETE(_, { params }) {
  await connectToDatabase();
  const { id } = await params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return Response.json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }
    return Response.json({
      status: 200,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return Response.json({
      status: 500,
      success: false,
      message: "Error while deleting product" + error,
    });
  }
}
