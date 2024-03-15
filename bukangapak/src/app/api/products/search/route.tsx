import ProductModel from "@/db/models/product";

export async function GET(
  request: Request,
  { params }: { params: { name?: string } }
) {
  try {
    const name = params?.name || "Default Name";
    const product = await ProductModel.findName(name);
    return Response.json({
      data: product,
    });
  } catch (error) {
    console.error(error);
  }
}
