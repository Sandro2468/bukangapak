import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MouseEvent } from "react";
import { ProductWishlist } from "../app/types/Product";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: ProductWishlist;
}

export default function CardProduct({ product }: ProductCardProps) {
  async function handleAddWishlist(
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    e.preventDefault();
    try {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      window.location.href = "/wishlist";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative group rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
        >
          {product.images &&
            product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-48 sm:h-56 lg:h-64"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.tags &&
            product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 z-10"
        onClick={(e) => handleAddWishlist(e, product._id)}
      >
        Add to Wishlist
      </button>
      <HeartIcon className="absolute top-2 right-2 h-6 w-6 text-gray-500 group-hover:text-red-500 cursor-pointer z-10" />
      <Link
        href={process.env.NEXT_PUBLIC_BASE_URL + `/product/${product.slug}`}
        legacyBehavior
      >
        <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 z-10">
          See Detail
        </button>
      </Link>
    </div>
  );
}

