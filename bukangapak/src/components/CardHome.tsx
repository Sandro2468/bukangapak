import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IProduct } from "../app/types/Product";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

export default function CardHome({ product }: ProductCardProps) {
  return (
    <div className="relative">
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
                  layout="responsive"
                  width={500}
                  height={500}
                  className="object-cover w-full h-48 sm:h-56 lg:h-64"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <Link href={`/product/${product._id}`} legacyBehavior>
        <a className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100">
          <span className="text-white text-lg font-semibold">See Detail</span>
        </a>
      </Link>
    </div>
  );
}
