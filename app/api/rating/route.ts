import { NextRequest, NextResponse } from "next/server";
import prismaClient  from "../../config/prisma";
import { ratingSchema } from "../../config/zod";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const storeId = url.searchParams.get("storeId");
    const where: any = {};
    if (storeId) where.storeId = Number(storeId);

    const ratings = await prismaClient.rating.findMany({ where, include: { user: true, store: true } });
    return NextResponse.json({ data: ratings });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ratingSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });

    const { userId, storeId, score, comment } = parsed.data;

    const store = await prismaClient.store.findUnique({ where: { id: storeId } });
    if (!store) return NextResponse.json({ message: "Store not found" }, { status: 404 });

    const existing = await prismaClient.rating.findFirst({ where: { userId, storeId } });
    if (existing) return NextResponse.json({ message: "User has already submitted rating. Use modify endpoint." }, { status: 400 });

    const rating = await prismaClient.rating.create({ data: { userId, storeId, score, comment } });
    return NextResponse.json(rating, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
