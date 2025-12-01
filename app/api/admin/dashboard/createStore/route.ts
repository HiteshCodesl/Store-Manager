import { NextResponse } from "next/server";
import prisma from "../../../../config/prisma"; 
export async function POST(req: Request) {
  try {
    const { storeName, storeEmail, storeAddress } = await req.json();
    console.log(storeName, storeEmail, storeAddress);
    if (!storeName || !storeEmail || !storeAddress) {
      return NextResponse.json(
        { message: "name, email, and address are required" },
        { status: 400 }
      );
    }

    const store = await prisma.store.create({
      data: {
        name: storeName,
        email: storeEmail,
        address: storeAddress,
      },
    });

    return NextResponse.json(
      { message: "Store created successfully", store },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create store error:", error);
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
