import Image from "next/image";
// import { IProduct } from "../app/types/Product";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Wishlist } from "@/app/types/Product";
import Link from "next/link";

interface WishlistCardProps {
  product: Wishlist;
  onDelete: (id: string) => void;
}

export default function WishlistCard({ product, onDelete }: WishlistCardProps) {
  async function handleDelete(e: MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();

    try {
      await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/wishlists/deleteWishlist/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log("deleted");
      onDelete(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        {product?.productWishlist &&
          product.productWishlist.map((item) => (
            <Image
              key={item._id}
              src={item.thumbnail}
              alt={item.name}
              className="rounded-xl"
              width={500}
              height={300}
            />
          ))}
      </figure>
      <div className="card-body items-center text-center">
        <div className="mb-2">
          {product.productWishlist &&
            product?.productWishlist.map((item) => (
              <h2 key={item._id} className="card-title">
                {item.name}!
              </h2>
            ))}
        </div>

        <div className="card-actions">
          <Link href={`/product/${product._id}`} legacyBehavior>
            <button className="btn btn-primary">See Detail</button>
          </Link>
          <button
            className="btn btn-error"
            onClick={(e) => handleDelete(e, product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
