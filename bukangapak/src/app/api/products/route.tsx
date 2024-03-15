import ProductModel from "@/db/models/product";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    console.log(cookies().get("Authorization"))
    const product = await ProductModel.getProduct();
    // console.log(data);
    return NextResponse.json({
      data: product
    });
  } catch (error) {
    return NextResponse.json({
      err: "internal server error",
    },
    {
      status: 500,
    })
  }
}
