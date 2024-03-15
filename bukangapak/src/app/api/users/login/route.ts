import { compareTextWithHash } from "@/db/helpers/bcrypt";
import { createToken } from "@/db/helpers/jwt";
import UserModel, { NewUserInput } from "@/db/models/user"
import { cookies } from "next/headers";
import { ZodError } from "zod";

export async function POST(request: Request){
    try {
        const body = await request.json() as NewUserInput
        const user = await UserModel.findUserByEmail(body.email)

        if(!user){
            return Response.json({
                error: 'Incorrect email/password'
            },{
                status: 401
            })
        }

        const isValid = compareTextWithHash(body.password, user.password)
        if(!isValid){
            return Response.json({
                error: 'Incorrect email/password'
            },{
                status: 401
            })
        }
    
        const accessToken = createToken({_id: user._id, email: user.email})
        cookies().set("Authorization", `Bearer ${accessToken}`)
        return Response.json({
            data: {accessToken}
        },
        )
    } catch (error) {
        if(error instanceof ZodError){
            const err = error.issues[0].path + ' ' + error.issues[0].message
            return Response.json(
                {
                    error: err
                },
                {
                    status: 400
                }
            )
        }
    }
}
