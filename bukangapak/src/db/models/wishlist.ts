import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { z } from "zod";

type Wishlist = {
  _id: ObjectId;
  userId: string;
  productId: string;
};

type Wishlistss = {
  _id: ObjectId;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  wishlistProduct: [];
};

export type NewWishlistInput = Omit<Wishlist, "_id">;

const WishlistInputSchema = z.object({
  userId: z.string(),
  productId: z.string(),
});

class WishlistModel {
  static getCollection() {
    return getCollection("wishlists");
  }

  static async getAllWishlist(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "wishlistProduct",
        },
      },
    ];
    const wishlistProduct = await this.getCollection().aggregate(agg).toArray();
    console.log("getAllWishlist", wishlistProduct);
    return wishlistProduct as Wishlistss[];
  }

  static async createWishlist(newWishlist: NewWishlistInput) {
    const parseResult = WishlistInputSchema.safeParse(newWishlist);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const result = await this.getCollection().insertOne({
      userId: new ObjectId(newWishlist.userId),
      productId: new ObjectId(newWishlist.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      _id: result.insertedId,
      ...newWishlist,
    };
  }

  static async findWishlist(userId: string, productId?: string) {
    const search = (await this.getCollection().findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    })) as Wishlist;

    return search;
  }

  static async deleteWishlist(id: string) {
    const findId = new ObjectId(id);
    const result = await this.getCollection().deleteOne({
      _id: findId,
    });
  }
}

export default WishlistModel;
