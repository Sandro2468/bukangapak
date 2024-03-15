export interface IProduct {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface Wishlist {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  productWishlist: ProductWishlist[];
}

export interface ProductWishlist {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

