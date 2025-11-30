import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../config/prisma";



export async function GET(req: NextRequest) {
  try {
    const totalUsers = await prismaClient.user.count();
    const totalStores = await prismaClient.store.count();
    const totalRatings = await prismaClient.rating.count();
    console.log(totalRatings, totalStores, totalUsers);

    return NextResponse.json({ totalUsers, totalStores, totalRatings });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
