import UserModel, { NewUserInput } from "@/db/models/user";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewUserInput;

    const result = await UserModel.createUser(body);
    return Response.json({
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].path + " " + error.issues[0].message;
      return Response.json(
        {
          error: err,
        },
        {
          status: 400,
        }
      );
    }
  }
}
