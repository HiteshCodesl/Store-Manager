import { NextRequest, NextResponse } from "next/server";
import prismaClient  from "../../../config/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());
    const store = await prismaClient.store.findUnique({ where: { id }, include: { ratings: { include: { user: true } } } });
    if (!store) return NextResponse.json({ message: "Store not found" }, { status: 404 });

    const average = store.ratings.length ? Math.round((store.ratings.reduce((a, b) => a + b.score, 0) / store.ratings.length) * 10) / 10 : null;
    return NextResponse.json({ ...store, averageRating: average });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());
    const data = await req.json();
    const updated = await prismaClient.store.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());
    await prismaClient.store.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
