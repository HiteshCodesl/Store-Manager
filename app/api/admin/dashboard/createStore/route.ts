import prisma from "../../../../config/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { storeName, storeEmail, storeAddress } = await req.json();

    if (!storeName || !storeEmail || !storeAddress) {
      return NextResponse.json(
        { error: "All fields (storeName, storeEmail, storeAddress) are required" },
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
    console.error("Store creation error:", error);
    return NextResponse.json(
      { error: "Error creating store" },
      { status: 500 }
    );
  }
}
