import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const user = await currentUser();
        if (!user) return new Response("Unauthorized", { status: 401 });
        const {message, imageUrl, cafeId, model} = await request.json();

        return new Response(JSON.stringify({message, imageUrl, cafeId, model}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}