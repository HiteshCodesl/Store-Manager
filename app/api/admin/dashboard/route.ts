import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../config/prisma";



export async function GET(req: NextRequest) {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();
    console.log(totalRatings, totalStores, totalUsers);

    return NextResponse.json({ totalUsers, totalStores, totalRatings });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
