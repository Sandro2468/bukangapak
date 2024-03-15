import UserModel from "@/db/models/user"
import { cookies } from "next/headers";

export async function GET(request: Request, 
    {params}: {params: {id: string} }) {
    console.log(cookies().get("Authorization"));
    
    const data = await UserModel.findUserById(params.id)

    return Response.json({
        data,
    })
}
