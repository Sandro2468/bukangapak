"use client";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import HomeBanner from "../components/Banner";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardHome from "@/components/CardHome";
import { IProduct } from "../app/types/Product";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/products"
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="p-8">
        <Container>
          <div>
            <HomeBanner />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products.map((product) => (
              <CardHome product={product} key={product._id} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/product" legacyBehavior>
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                Shop Now
              </a>
            </Link>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
