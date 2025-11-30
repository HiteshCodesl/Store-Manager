import { NextResponse } from "next/server";
import prisma from "../../config/prisma"; 

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {role: "USER"},
      orderBy: { createdAt: "asc" }, 
      select: {
        id: true,
        name: true,
        email: true,    
        createdAt: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
