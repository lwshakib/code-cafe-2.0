import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    console.log(id);
    
    try {
        const cafe = await prisma.cafe.findUnique({
            where: {
                id,
            },
            include: {
                messages: true,
            },
        });
        if (!cafe) return NextResponse.json({ error: "Not Found" }, { status: 404 });
        return NextResponse.json(cafe, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
