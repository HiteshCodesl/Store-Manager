import { NextResponse } from "next/server";
import prismaClient from "../../config/prisma";

export async function GET() {
  try {
    const stores = await prismaClient.store.findMany({
      orderBy: { createdAt: "asc" }, 
    });

    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      { message: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}
