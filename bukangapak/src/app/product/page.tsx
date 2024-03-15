"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CardProduct from "../../components/CardProduct";
// import { IProduct } from "../types/Product";
import { ProductWishlist } from "../types/Product";

export default function ProductItem() {
  const [products, setProducts] = useState<ProductWishlist[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/products",
          {
            cache: "no-store",
          }
        );
        const responseData = await response.json();
        const productList: ProductWishlist[] = responseData.data;
        setProducts(productList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="flex justify-center">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
          style={{ maxWidth: "1280px" }}
        >
          {products.map((product) => (
            <CardProduct product={product} key={product._id} />
          ))}
        </div>
      </div>
    </main>
  );
}
