import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import bcryptjs from "bcryptjs";
import { z } from "zod";

type User = {
  _id: ObjectId;
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export type NewUserInput = Omit<User, "_id">;

const userInputSchema = z.object({
  name: z.string(),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(5),
});
class UserModel {
  static getCollection() {
    return getCollection("users");
  }

  static async findUsers() {
    return (await this.getCollection().find().toArray()) as User[];
  }

  static async createUser(newUser: NewUserInput) {
    const parseResult = userInputSchema.safeParse(newUser);
    if (!parseResult.success) {
      throw parseResult.error;
    }
    const result = await this.getCollection().insertOne({
      ...newUser,
      password: bcryptjs.hashSync(newUser.password),
    });

    return {
      _id: result.insertedId,
      ...newUser,
    } as User;
  }

  static async findUserById(id: string) {
    const objId = new ObjectId(id);
    return (await this.getCollection().findOne({
      _id: objId,
    })) as User | null;
  }

  static async findUserByEmail(email: string) {
    return (await this.getCollection().findOne({
      email: email,
    })) as User;
  }
}

export default UserModel;
