import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) return new Response("Unauthorized", { status: 401 });
        const cafes = await prisma.cafe.findMany({
            where: {
                clerkId: user.id,
            },
        });
        return new Response(JSON.stringify(cafes), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const user = await currentUser();
        if (!user) return new Response("Unauthorized", { status: 401 });
        const cafe = await prisma.cafe.create({
            data: {
                clerkId: user.id,
                name: "New Cafe",
            },
        });
        return new Response(JSON.stringify(cafe), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        const user = await currentUser();
        if (!user) return new Response("Unauthorized", { status: 401 });
        const {cafeId} = await request.json();
        const cafe = await prisma.cafe.delete({
            where: {
                id: cafeId,
            },
        });
        return new Response(JSON.stringify(cafe), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}