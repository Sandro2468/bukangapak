import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayload, readPayloadJose } from "./db/helpers/jwt";

export async function middleware(request: NextRequest){
    try {
        // console.log("masuk pak");
        let token = cookies().get("Authorization")?.value.split(" ")[1]
        
    
        if(!token){
            return Response.json({
                error:"Authentication failed"
            },
            {
                status: 401
            })
        }
    
        const decoded = await readPayloadJose<{_id:string; email:string}>(token)
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-id-user", decoded._id)
        requestHeaders.set("x-email-user", decoded.email)

        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            },
        })
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const config = {
    matcher: '/api/wishlists/:path*'
}
