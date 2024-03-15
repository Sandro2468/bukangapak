import WishlistModel from "@/db/models/wishlist";

export async function DELETE(request: Request,
    {params}: {params: {id:string} }){
        const data = await WishlistModel.deleteWishlist(params.id)
        return Response.json({
            data: 'wishlist successfully deleted'
        })
    }