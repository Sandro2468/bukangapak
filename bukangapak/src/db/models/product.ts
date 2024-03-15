import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { z } from "zod";

type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: [string];
  thumbnail: string;
  images: [string];
  createdAt: string;
  updatedAt: string;
};

const ProductInputSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

class ProductModel {
  static getCollection() {
    return getCollection("products");
  }

  static async getProduct() {
    return await this.getCollection().find().toArray();
  }

  static async getProductSlug(slug: string) {
    const search = await this.getCollection().findOne({
      slug: slug,
    });
    return search as Product;
  }

  static async findName(name?: string) {
    const regex = new RegExp("^" + name, "i");
    const searchCursor = (await this.getCollection()
      .find({
        name: regex,
      })
      .toArray()) as Product[];
    return searchCursor as Product[];
  }
}
export default ProductModel;
