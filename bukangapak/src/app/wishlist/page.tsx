"use client";
import { useEffect, useState } from "react";
import WishlistCard from "@/components/CardWishlist";
import { Wishlist } from "../types/Product";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Product() {
  let router = useRouter();
  const [products, setProducts] = useState<Wishlist[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists",
          {
            cache: "no-store",
          }
        );
        const responseData = await response.json();
        console.log(responseData)
        const productList: Wishlist[] = responseData.data;
        setProducts(productList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists/${id}`, {
        method: "DELETE",
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="p-5">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <WishlistCard
                product={product}
                key={product._id}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center text-gray-600">
              Your wishlist is empty
            </div>
          )}
        </div>
      </main>
    </>
  );
}
