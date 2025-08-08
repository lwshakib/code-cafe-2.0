import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (existUser) {
      return existUser;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name: user.fullName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}