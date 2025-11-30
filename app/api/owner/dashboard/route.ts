import { NextRequest, NextResponse } from "next/server";
import  prismaClient from "../../../config/prisma";

export async function GET(req: NextRequest) {
  try {
    // Instead of reading authenticated user, accept ownerId as a query parameter
    const url = new URL(req.url);
    const ownerIdParam = url.searchParams.get("ownerId");
    if (!ownerIdParam) {
      return NextResponse.json({ message: "ownerId query parameter required" }, { status: 400 });
    }
    const ownerId = Number(ownerIdParam);

    const stores = await prismaClient.store.findMany({
      where: { ownerId },
      include: { ratings: { include: { user: true } } },
    });

    const storesWithAvg = stores.map((s) => ({
      id: s.id,
      name: s.name,
      averageRating: s.ratings.length ? Math.round((s.ratings.reduce((a, b) => a + b.score, 0) / s.ratings.length) * 10) / 10 : null,
      ratings: s.ratings.map((r) => ({ id: r.id, score: r.score, user: { id: r.user.id, name: r.user.name, email: r.user.email } })),
    }));

    const usersWhoRated = Array.from(new Map(stores.flatMap((s) => s.ratings.map((r) => [r.userId, r.user]))).values());

    return NextResponse.json({ stores: storesWithAvg, usersWhoRated });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
